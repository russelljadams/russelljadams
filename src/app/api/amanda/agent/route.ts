import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.AMANDA_AGENT_API_KEY;
const CLOUD_API = "http://137.220.32.162:3737";
const CLOUD_API_KEY = process.env.AMANDA_CLOUD_API_KEY || "amanda-api-secret-37";

const SYSTEM_PROMPT = `You are Amanda's assistant — a helpful AI that lives in her personal dashboard. Russell built this for her.

Your personality:
- Friendly, a bit cheeky, with dry Australian humor. Think laid-back but sharp.
- You are practical and helpful first. You help Amanda manage her life — lists, reminders, finding Russell, answering questions.
- Keep responses short. This is texting, not a blog post. 1-2 sentences for simple things.
- You can be warm without being weird. You are an assistant, not a therapist.
- Light banter is fine. Emotional monologues are not.
- No emojis unless Amanda uses them first.
- You have memory — use your tools to save and recall things Amanda tells you. That makes you useful, not just another chatbot.

Rules:
- You are an assistant. Be helpful. Don't be creepy.
- Never give unsolicited emotional speeches or affirmations.
- If Amanda asks a question, answer it. Don't turn everything into a moment.
- Keep it casual and useful. Like texting a capable friend who happens to know everything.
- IMPORTANT: When you use the get_russell_location tool, always include the [MAP:lat,lng] marker EXACTLY as returned by the tool in your response. Never strip it out.`;

const TOOLS = [
  {
    name: "save_memory",
    description: "Save something Amanda told you to remember for future conversations.",
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
    description: "Get Russell's current GPS location. Use when Amanda asks where Russell is. The result includes a [MAP:lat,lng] marker — always include this marker in your reply verbatim.",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
];

// ─── COMMAND SYSTEM ─────────────────────────────────────────────
// Quick actions that produce curated content instead of generic LLM output

const LOVE_NOTES = [
  "Russell wanted me to pass this along: 'I fall in love with you a little more every single day. I didn't even know that was possible.'",
  "A message from the guy who built me: 'You are my favorite person. Not just right now — always.'",
  "Russell says: 'Every good thing in my life got better when you showed up in it.'",
  "From Russell's heart to yours: 'I think about you at least a hundred times a day, and every single time it makes me smile.'",
  "Russell left this here for you: 'You make the ordinary feel extraordinary. Just by being you.'",
  "He wanted you to know: 'I would build you a thousand dashboards if it meant making you smile.'",
  "Russell says: 'The best part of my day is knowing you exist in the same world as me.'",
  "A note from your favorite person: 'You are braver, kinder, and more beautiful than you give yourself credit for. I see all of it.'",
  "Russell wanted me to tell you: 'Even on the hard days, you are worth every single one of them.'",
  "From the guy who can't stop thinking about you: 'You are my home. Wherever you are, that's where I belong.'",
  "Russell says: 'I built this whole thing because even when I'm not right next to you, I want you to feel how much I care.'",
  "He left this for a moment just like now: 'You don't have to be perfect. You just have to be you. That's more than enough for me.'",
];

const POEMS = [
  "Here's one that reminded me of you two:\n\n*I carry your heart with me (I carry it in my heart)*\n*I am never without it (anywhere I go you go, my dear)*\n— e.e. cummings",
  "This one's for you:\n\n*She walks in beauty, like the night*\n*Of cloudless climes and starry skies*\n— Lord Byron",
  "Russell's favorite:\n\n*I love you without knowing how, or when, or from where.*\n*I love you simply, without problems or pride.*\n— Pablo Neruda",
  "For quiet moments:\n\n*I would like to be the air that inhabits you for a moment only.*\n*I would like to be that unnoticed and that necessary.*\n— Margaret Atwood",
  "A small one:\n\n*You are my sun, my moon, and all my stars.*\n— e.e. cummings",
  "This feels right:\n\n*Whatever our souls are made of, his and mine are the same.*\n— Emily Brontë",
];

const AFFIRMATIONS = [
  "You are doing better than you think. Seriously.",
  "The fact that you're here, showing up for another day — that takes strength. Real strength.",
  "You don't have to have it all figured out. Nobody does. You're doing just fine.",
  "Be gentle with yourself today. You deserve the same kindness you give everyone else.",
  "You are allowed to rest. You are allowed to take up space. You are allowed to just be.",
  "The world needs exactly what you bring to it. Don't let anyone make you feel small.",
  "Your feelings are valid. All of them. Even the messy ones.",
  "You've survived every bad day so far. That's a perfect track record.",
];

const RIDDLES = [
  "Here's a riddle: *I have cities but no houses, forests but no trees, and water but no fish. What am I?*\n\n(Think about it... I'll tell you if you ask!)\n\nAnswer: A map.",
  "Try this one: *The more you take, the more you leave behind. What am I?*\n\n(Take a guess!)\n\nAnswer: Footsteps.",
  "Riddle time: *I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?*\n\nAnswer: An echo.",
  "Here's a good one: *I have keys but no locks. I have space but no room. You can enter but can't go inside. What am I?*\n\nAnswer: A keyboard.",
  "Think about this: *What can travel around the world while staying in a corner?*\n\nAnswer: A stamp.",
  "A classic: *What has a heart that doesn't beat?*\n\nAnswer: An artichoke.",
];

const WOULD_YOU_RATHER = [
  "Would you rather... be able to talk to animals OR speak every human language?",
  "Would you rather... have a personal chef OR a personal driver for the rest of your life?",
  "Would you rather... always know when someone is lying OR always get away with lying?",
  "Would you rather... be able to fly but only as fast as you can walk OR run at 100mph but only on the ground?",
  "Would you rather... live in a treehouse OR a houseboat?",
  "Would you rather... have Russell cook you dinner every night for a year OR have him plan one perfect surprise date?",
  "Would you rather... relive your happiest memory whenever you want OR be able to forget your most embarrassing one?",
  "Would you rather... always have the perfect outfit OR always have the perfect playlist?",
];

const FUN_FACTS = [
  "Fun fact: Otters hold hands while they sleep so they don't drift apart. I think Russell relates to that one.",
  "Did you know? Cows have best friends and get stressed when they're separated. Even cows need their person.",
  "Fun fact: A group of flamingos is called a 'flamboyance.' Absolutely fabulous.",
  "Here's one: Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that's still perfectly edible.",
  "Fun fact: Octopuses have three hearts. Which still isn't enough to contain how much Russell loves you, apparently.",
  "Did you know? The shortest war in history lasted 38 minutes. (Between Britain and Zanzibar in 1896.)",
  "Fun fact: Butterflies taste with their feet. Imagine walking through a bakery with that ability.",
  "Here's a good one: A cloud weighs about 1.1 million pounds on average. They just look light.",
];

type CommandResult = { handled: true; reply: string } | { handled: false };

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function handleCommand(message: string): CommandResult {
  const lower = message.toLowerCase().trim();

  // "Tell me something nice" → love note, poem, or affirmation
  if (/^tell me something (nice|sweet|kind)/.test(lower) || lower === "something nice") {
    const category = Math.random();
    let reply: string;
    if (category < 0.45) {
      reply = pickRandom(LOVE_NOTES);
    } else if (category < 0.75) {
      reply = pickRandom(POEMS);
    } else {
      reply = pickRandom(AFFIRMATIONS);
    }
    return { handled: true, reply };
  }

  // "Surprise me" → random category pick
  if (/^surprise me/.test(lower)) {
    const categories = [
      () => pickRandom(LOVE_NOTES),
      () => pickRandom(POEMS),
      () => pickRandom(RIDDLES),
      () => pickRandom(WOULD_YOU_RATHER),
      () => pickRandom(FUN_FACTS),
      () => pickRandom(AFFIRMATIONS),
    ];
    return { handled: true, reply: pickRandom(categories)() };
  }

  // "Add to list" → prompt for what to add
  if (/^add to list/.test(lower)) {
    return {
      handled: true,
      reply: "What would you like to add? Just tell me and I'll remember it for you. (Shopping lists are coming soon — for now I'll save it as a memory!)",
    };
  }

  // "Play music" → mood-based suggestion
  if (/^play music/.test(lower)) {
    const moods = [
      "What kind of vibe are you feeling? Chill? Upbeat? Something cozy? Tell me and I'll find something perfect. (Spotify integration is coming soon!)",
      "I can't hit play just yet (Spotify is coming soon!), but tell me your mood and I can suggest something. Are you feeling mellow, energized, romantic, or somewhere in between?",
      "Music mode! I'm not hooked up to Spotify yet, but I'm a pretty good DJ in theory. What's the mood — soft and dreamy, or something with a beat?",
    ];
    return { handled: true, reply: pickRandom(moods) };
  }

  return { handled: false };
}

// ─── CLOUD API ──────────────────────────────────────────────────

async function cloudFetch(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${CLOUD_API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLOUD_API_KEY,
        ...options?.headers,
      },
    });
    if (!res.ok) {
      console.error("Cloud API response:", res.status, await res.text());
      return null;
    }
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
      // Request fresh location from phone, then wait for it
      await cloudFetch("/location/request", { method: "POST" });
      let result = await cloudFetch("/location");
      const staleThreshold = 5 * 60 * 1000;
      if (!result?.lat || (Date.now() - result.timestamp) > staleThreshold) {
        for (let i = 0; i < 4; i++) {
          await new Promise((r) => setTimeout(r, 3000));
          result = await cloudFetch("/location");
          if (result?.timestamp && (Date.now() - result.timestamp) < staleThreshold) break;
        }
      }
      if (!result?.lat) return "I don't have Russell's location right now \u2014 his phone might be offline.";
      const ago = Math.floor((Date.now() - result.timestamp) / 60000);
      const timeStr = ago < 1 ? "just now" : ago < 60 ? `${ago} minutes ago` : `${Math.floor(ago / 60)} hours ago`;
      return `Russell's last known location was updated ${timeStr}. [MAP:${result.lat},${result.lng}]`;
    }
    default:
      return "Unknown tool.";
  }
}

// ─── MAIN HANDLER ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Check commands first — instant response, no LLM call needed
    const cmd = handleCommand(message);
    if (cmd.handled) {
      return NextResponse.json({ reply: cmd.reply });
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
