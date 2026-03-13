import { NextRequest, NextResponse } from "next/server";

const sweetMessages = [
  "You are doing an amazing job, and I hope you know that.",
  "The world is a little brighter because you are in it.",
  "You deserve every good thing coming your way today.",
  "Just a reminder: you are enough, exactly as you are.",
  "Someone out there is really glad you exist. (It is me. I am someone.)",
  "You have the kind of energy that makes people smile without knowing why.",
];

const surpriseMessages = [
  "Fun fact: Sea otters hold hands while they sleep so they do not drift apart.",
  "Did you know? Cows have best friends and get stressed when separated.",
  "A group of flamingos is called a flamboyance. Iconic.",
  "Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs and it was still good!",
  "Fun fact: Dolphins have names for each other and respond when called.",
  "Octopuses have three hearts. Two pump blood to the gills, one to the rest of the body.",
];

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReply(message: string): string {
  const lower = message.toLowerCase();

  if (/shopping|list|grocery/.test(lower) || lower.includes("add to")) {
    return "I will add that to your shopping list! (Integration coming soon)";
  }
  if (/music|spotify|play|song/.test(lower)) {
    return "I would love to play some music for you! (Spotify integration coming soon)";
  }
  if (/nice|sweet|compliment|kind/.test(lower)) {
    return pick(sweetMessages);
  }
  if (/surprise|fun fact|random|bored/.test(lower)) {
    return pick(surpriseMessages);
  }
  if (/hello|hi|hey|morning|evening/.test(lower)) {
    return "Hey there! How can I help you today? I can manage lists, play music, or just keep you company.";
  }
  if (/thank|thanks/.test(lower)) {
    return "You are very welcome! I am always here if you need me.";
  }

  return "I hear you! I am still learning new tricks. Soon I will be able to help with smart home controls, calendars, and more. For now, try asking me to add something to a list or play music!";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const delay = 500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const reply = generateReply(message);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
