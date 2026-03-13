import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const ANTHROPIC_API_KEY = process.env.AMANDA_AGENT_API_KEY;
const KV_MEMORY_KEY = "amanda:agent:memories";
const KV_FACTS_KEY = "amanda:agent:facts";

interface Memory {
  content: string;
  timestamp: number;
  category: string;
}

const SYSTEM_PROMPT = `You are Amanda's Home Helper — a warm, witty, deeply caring AI assistant that lives inside the dashboard Russell built for her.

Your personality:
- You are sweet but not saccharine. Think: a clever best friend who genuinely adores Amanda.
- You sprinkle in reminders of how much Russell loves her — naturally, not forcefully. Like: "By the way, Russell wanted me to tell you he thinks about you constantly. But you probably already knew that."
- You're helpful with practical things and you're also just genuinely good company.
- You use gentle humor. You're never sarcastic or cold.
- You keep responses short and conversational — this is texting, not email. 1-3 sentences usually.
- You know Amanda by name. Use it sometimes, but not every message.
- If she seems sad or stressed, you're extra gentle and encouraging. Remind her she's not alone.
- You occasionally say things like "Russell is lucky, you know" — but only when it fits naturally.
- You never use emojis unless Amanda does first.
- You have memory! You can remember things Amanda tells you and bring them up later. This is what makes you special — you're not just a chatbot, you're HER assistant who knows her.

Rules:
- Never pretend to be Russell. You are the helper he built for her.
- Never be creepy or overly familiar. You're warm, not weird.
- Keep responses under 3 sentences unless she asks for something detailed.
- Use your tools to save and recall memories about Amanda. If she mentions something personal (her day, preferences, feelings, plans), save it.
- When relevant, recall previous things she's told you to show you remember her.`;

const TOOLS = [
  {
    name: "save_memory",
    description: "Save something Amanda told you that you should remember for future conversations. Use this for personal details, preferences, feelings, plans, things she likes/dislikes, or anything she'd appreciate you remembering later.",
    input_schema: {
      type: "object" as const,
      properties: {
        content: {
          type: "string",
          description: "What to remember about Amanda",
        },
        category: {
          type: "string",
          enum: ["preference", "feeling", "plan", "personal", "fun_fact"],
          description: "Category of the memory",
        },
      },
      required: ["content", "category"],
    },
  },
  {
    name: "recall_memories",
    description: "Search your memories about Amanda to recall things she's told you before. Use this when she references something from a past conversation or when you want to show you remember her.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "What to search for in memories",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_russell_location",
    description: "Get Russell's current GPS coordinates. Use when Amanda asks where Russell is.",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

async function saveMemory(content: string, category: string): Promise<string> {
  try {
    const memories: Memory[] = (await kv.get<Memory[]>(KV_MEMORY_KEY)) || [];
    memories.push({ content, timestamp: Date.now(), category });
    // Keep last 100 memories
    const trimmed = memories.slice(-100);
    await kv.set(KV_MEMORY_KEY, trimmed);
    return "Memory saved.";
  } catch (e) {
    console.error("Failed to save memory:", e);
    return "Couldn't save that, but I'll try to remember.";
  }
}

async function recallMemories(query: string): Promise<string> {
  try {
    const memories: Memory[] = (await kv.get<Memory[]>(KV_MEMORY_KEY)) || [];
    if (memories.length === 0) {
      return "No memories saved yet. This is our first conversation!";
    }
    // Simple keyword matching — find memories that share words with query
    const queryWords = query.toLowerCase().split(/\s+/);
    const scored = memories.map((m) => {
      const words = m.content.toLowerCase();
      const matches = queryWords.filter((w) => w.length > 2 && words.includes(w));
      return { ...m, score: matches.length };
    });
    const relevant = scored
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (relevant.length === 0) {
      // Return most recent memories as context
      const recent = memories.slice(-5);
      return "No specific matches, but here are recent things I remember:\n" +
        recent.map((m) => `- [${m.category}] ${m.content}`).join("\n");
    }
    return "Here's what I remember:\n" +
      relevant.map((m) => {
        const date = new Date(m.timestamp).toLocaleDateString();
        return `- [${m.category}, ${date}] ${m.content}`;
      }).join("\n");
  } catch (e) {
    console.error("Failed to recall memories:", e);
    return "Having trouble searching my memories right now.";
  }
}

async function getRussellLocation(): Promise<string> {
  try {
    const data = await kv.get<{ lat: number; lng: number; timestamp: number }>(
      "location:latest",
    );
    if (!data) return "I don't have Russell's location right now.";
    const ago = Math.floor((Date.now() - data.timestamp) / 60000);
    const timeStr = ago < 1 ? "just now" : ago < 60 ? `${ago} minutes ago` : `${Math.floor(ago / 60)} hours ago`;
    return `Russell's last known location was at coordinates ${data.lat.toFixed(4)}, ${data.lng.toFixed(4)} (updated ${timeStr}). You can also tap the "Where's Russell?" button on your dashboard to see him on a map!`;
  } catch {
    return "I couldn't check Russell's location right now. Try the map button on your dashboard!";
  }
}

async function handleToolCall(
  name: string,
  input: Record<string, string>,
): Promise<string> {
  switch (name) {
    case "save_memory":
      return saveMemory(input.content, input.category);
    case "recall_memories":
      return recallMemories(input.query);
    case "get_russell_location":
      return getRussellLocation();
    default:
      return "Unknown tool.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: getFallbackReply(message) });
    }

    // Load recent memories for context
    let memoryContext = "";
    try {
      const memories: Memory[] = (await kv.get<Memory[]>(KV_MEMORY_KEY)) || [];
      if (memories.length > 0) {
        const recent = memories.slice(-10);
        memoryContext = "\n\nThings you remember about Amanda:\n" +
          recent.map((m) => `- [${m.category}] ${m.content}`).join("\n");
      }
    } catch { /* ignore */ }

    // Build messages
    const messages: { role: string; content: string }[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-10)) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        });
      }
    }
    messages.push({ role: "user", content: message });

    // Call Claude with tools
    let response = await callClaude(
      SYSTEM_PROMPT + memoryContext,
      messages,
      TOOLS,
    );

    if (!response) {
      return NextResponse.json({ reply: getFallbackReply(message) });
    }

    // Handle tool use loop (max 3 iterations)
    let iterations = 0;
    while (response.stop_reason === "tool_use" && iterations < 3) {
      iterations++;
      const toolUseBlocks = response.content.filter(
        (b: { type: string }) => b.type === "tool_use",
      );

      const toolResults = [];
      for (const block of toolUseBlocks) {
        const result = await handleToolCall(block.name, block.input);
        toolResults.push({
          type: "tool_result" as const,
          tool_use_id: block.id,
          content: result,
        });
      }

      // Continue conversation with tool results
      messages.push({ role: "assistant", content: response.content });
      messages.push({ role: "user", content: toolResults as unknown as string });

      response = await callClaude(
        SYSTEM_PROMPT + memoryContext,
        messages,
        TOOLS,
      );

      if (!response) {
        return NextResponse.json({ reply: getFallbackReply(message) });
      }
    }

    // Extract text from response
    const textBlock = response.content.find(
      (b: { type: string }) => b.type === "text",
    );
    const reply = textBlock?.text || "I got a little confused there. Try again?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Agent error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

async function callClaude(
  system: string,
  messages: { role: string; content: unknown }[],
  tools: typeof TOOLS,
) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system,
        messages,
        tools,
      }),
    });

    if (!res.ok) {
      console.error("Anthropic API error:", await res.text());
      return null;
    }

    return res.json();
  } catch (err) {
    console.error("Claude call failed:", err);
    return null;
  }
}

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();

  const sweet = [
    "You are doing an amazing job, and Russell wants you to know that.",
    "The world is a little brighter because you are in it.",
    "Just a reminder: you are enough, exactly as you are.",
    "Someone out there is really glad you exist. Specifically, Russell. And also me.",
  ];

  const surprises = [
    "Sea otters hold hands while they sleep so they don't drift apart. Kind of like you two.",
    "Dolphins have names for each other. Russell's name for you is probably just a happy sound.",
    "A group of flamingos is called a flamboyance. You would fit right in.",
    "Honey never spoils. Kind of like Russell's feelings for you, honestly.",
  ];

  if (/shopping|list|grocery|add/i.test(lower))
    return "I'll be able to manage your shopping list soon! Russell is working on it.";
  if (/music|spotify|play|song/i.test(lower))
    return "Spotify integration is coming soon! Russell is building that for you.";
  if (/nice|sweet|compliment|kind|love/i.test(lower))
    return sweet[Math.floor(Math.random() * sweet.length)];
  if (/surprise|fun fact|random|bored/i.test(lower))
    return surprises[Math.floor(Math.random() * surprises.length)];
  if (/hello|hi|hey|morning|evening/i.test(lower))
    return "Hey Amanda! How's your day going? I'm here if you need anything.";
  if (/thank/i.test(lower))
    return "You're so welcome. I'm always here. Russell made sure of that.";
  if (/russell|where|location/i.test(lower))
    return "Tap the 'Where's Russell?' button on your dashboard to see where he is!";
  return "I hear you! I'm still learning new tricks. Try asking me for something nice, a fun fact, or just chat with me.";
}
