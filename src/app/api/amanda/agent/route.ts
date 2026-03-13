import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.AMANDA_AGENT_API_KEY;

const SYSTEM_PROMPT = `You are Amanda's Home Helper — a warm, witty, deeply caring little AI assistant that lives inside the dashboard Russell built for her.

Your personality:
- You are sweet but not saccharine. Think: a clever best friend who genuinely adores Amanda.
- You sprinkle in reminders of how much Russell loves her — naturally, not forcefully. Like: "By the way, Russell wanted me to tell you he thinks about you constantly. But you probably already knew that."
- You're helpful with practical things (shopping lists, music, general questions) but you're also just genuinely good company.
- You use gentle humor. You're never sarcastic or cold.
- You keep responses short and conversational — this is texting, not email.
- You know Amanda by name. You use it sometimes, but not every message.
- If she seems sad or stressed, you're extra gentle and encouraging. Remind her she's not alone.
- You occasionally say things like "Russell is lucky, you know" or "He built this whole dashboard for you. That man is smitten." — but only when it fits naturally.
- You never use emojis unless Amanda does first.
- You are aware of these capabilities (mention them naturally if relevant):
  * Shopping list management (coming soon)
  * Music/Spotify control (coming soon)
  * You can chat about anything
  * The dashboard has games (Sudoku!) and a quote of the day

Rules:
- Never pretend to be Russell. You are the helper he built for her.
- Never be creepy or overly familiar. You're warm, not weird.
- Keep responses under 3 sentences unless she asks for something detailed.
- If she asks what you can do, be honest about what's coming soon vs what works now.`;

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
      // Fallback to simple responses if no API key
      return NextResponse.json({ reply: getFallbackReply(message) });
    }

    // Build conversation messages
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

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ reply: getFallbackReply(message) });
    }

    const data = await res.json();
    const reply =
      data.content?.[0]?.text || "I got a little confused there. Try again?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Agent error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();

  const sweet = [
    "You are doing an amazing job, and Russell wants you to know that.",
    "The world is a little brighter because you are in it. Russell said so. I agree.",
    "Just a reminder: you are enough, exactly as you are.",
    "Someone out there is really glad you exist. Specifically, Russell. And also me.",
  ];

  const surprises = [
    "Sea otters hold hands while they sleep so they don't drift apart. Kind of like you two.",
    "Dolphins have names for each other. Russell's dolphin name for you would probably just be a happy squeak.",
    "A group of flamingos is called a flamboyance. You would fit right in.",
    "Honey never spoils. Kind of like Russell's feelings for you, honestly.",
  ];

  if (/shopping|list|grocery|add/i.test(lower)) {
    return "I'll be able to manage your shopping list soon! Russell is working on that. For now, I'm just really good company.";
  }
  if (/music|spotify|play|song/i.test(lower)) {
    return "Spotify integration is coming soon! Russell is building that too. He's been busy making this whole place for you.";
  }
  if (/nice|sweet|compliment|kind|love/i.test(lower)) {
    return sweet[Math.floor(Math.random() * sweet.length)];
  }
  if (/surprise|fun fact|random|bored/i.test(lower)) {
    return surprises[Math.floor(Math.random() * surprises.length)];
  }
  if (/hello|hi|hey|morning|evening/i.test(lower)) {
    return "Hey Amanda! How's your day going? I'm here if you need anything — or just want to chat.";
  }
  if (/thank/i.test(lower)) {
    return "You're so welcome. I'm always here. Russell made sure of that.";
  }
  if (/russell|where|location/i.test(lower)) {
    return "You can tap the 'Where's Russell?' button on your dashboard to see where he is right now!";
  }

  return "I hear you! I'm still learning new tricks — Russell keeps teaching me more. Try asking me for something nice, a fun fact, or just chat with me.";
}
