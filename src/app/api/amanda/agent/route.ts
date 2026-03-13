import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.AMANDA_AGENT_API_KEY;
const CLOUD_API = "http://100.85.186.91:3737";

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
- You have memory! You can remember things Amanda tells you and bring them up later. This makes you special — you're not a chatbot, you're HER assistant who knows her.

Rules:
- Never pretend to be Russell. You are the helper he built for her.
- Never be creepy or overly familiar. You're warm, not weird.
- Keep responses under 3 sentences unless she asks for something detailed.
- Use your tools to save and recall memories. If she mentions something personal, save it.
- When relevant, recall previous things she's told you to show you remember.`;

const TOOLS = [
  {
    name: "save_memory",
    description: "Save something Amanda told you to remember for future conversations. Use for personal details, preferences, feelings, plans, things she likes/dislikes.",
    input_schema: {
      type: "object" as const,
      properties: {
        content: { type: "string", description: "What to remember about Amanda" },
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
    description: "Search memories about Amanda to recall things she's told you before.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "What to search for" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_russell_location",
    description: "Get Russell's current GPS location. Use when Amanda asks where Russell is.",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
];

async function cloudFetch(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${CLOUD_API}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
    });
    return res.json();
  } catch (e) {
    console.error("Cloud API error:", e);
    return null;
  }
}

async function handleToolCall(name: string, input: Record<string, string>) {
  switch (name) {
    case "save_memory": {
      const result = await cloudFetch("/memories", {
        method: "POST",
        body: JSON.stringify({ content: input.content, category: input.category }),
      });
      return result?.ok ? "Memory saved." : "Couldn't save that right now.";
    }
    case "recall_memories": {
      const result = await cloudFetch(`/memories?q=${encodeURIComponent(input.query)}`);
      if (!result?.memories?.length) return "No memories found yet.";
      return "Here's what I remember:\n" +
        result.memories.map((m: { category: string; content: string }) =>
          `- [${m.category}] ${m.content}`
        ).join("\n");
    }
    case "get_russell_location": {
      const result = await cloudFetch("/location");
      if (!result?.lat) return "I don't have Russell's location right now.";
      const ago = Math.floor((Date.now() - result.timestamp) / 60000);
      const timeStr = ago < 1 ? "just now" : ago < 60 ? `${ago} minutes ago` : `${Math.floor(ago / 60)} hours ago`;
      return `Russell's last known location was updated ${timeStr}. [MAP:${result.lat},${result.lng}]`;
    }
    default:
      return "Unknown tool.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: fallbackReply(message) });
    }

    // Load recent memories for context
    let memoryContext = "";
    const memResult = await cloudFetch("/memories");
    if (memResult?.memories?.length) {
      memoryContext = "\n\nThings you remember about Amanda:\n" +
        memResult.memories.map((m: { category: string; content: string }) =>
          `- [${m.category}] ${m.content}`
        ).join("\n");
    }

    // Build conversation
    const messages: { role: string; content: unknown }[] = [];
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
    let response = await callClaude(SYSTEM_PROMPT + memoryContext, messages, TOOLS);
    if (!response) return NextResponse.json({ reply: fallbackReply(message) });

    // Tool use loop (max 3)
    let iterations = 0;
    while (response.stop_reason === "tool_use" && iterations < 3) {
      iterations++;
      const toolBlocks = response.content.filter((b: { type: string }) => b.type === "tool_use");
      const toolResults = [];

      for (const block of toolBlocks) {
        const result = await handleToolCall(block.name, block.input);
        toolResults.push({
          type: "tool_result" as const,
          tool_use_id: block.id,
          content: result,
        });
      }

      messages.push({ role: "assistant", content: response.content });
      messages.push({ role: "user", content: toolResults });

      response = await callClaude(SYSTEM_PROMPT + memoryContext, messages, TOOLS);
      if (!response) return NextResponse.json({ reply: fallbackReply(message) });
    }

    const textBlock = response.content.find((b: { type: string }) => b.type === "text");
    return NextResponse.json({ reply: textBlock?.text || "I got confused. Try again?" });
  } catch (err) {
    console.error("Agent error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

async function callClaude(system: string, messages: { role: string; content: unknown }[], tools: typeof TOOLS) {
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
    if (!res.ok) { console.error("Claude error:", await res.text()); return null; }
    return res.json();
  } catch (e) { console.error("Claude call failed:", e); return null; }
}

function fallbackReply(message: string): string {
  const lower = message.toLowerCase();
  const sweet = [
    "You are doing an amazing job, and Russell wants you to know that.",
    "The world is a little brighter because you are in it.",
    "Someone out there is really glad you exist. Specifically, Russell.",
  ];
  if (/nice|sweet|compliment|love/i.test(lower)) return sweet[Math.floor(Math.random() * sweet.length)];
  if (/hello|hi|hey/i.test(lower)) return "Hey Amanda! How's your day? I'm here if you need anything.";
  if (/russell|where/i.test(lower)) return "Tap 'Where's Russell?' to find him!";
  return "I'm still warming up. Try again in a sec!";
}
