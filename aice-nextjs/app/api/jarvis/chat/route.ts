import { NextRequest, NextResponse } from "next/server";
import { JarvisBot } from "@/lib/jarvis/jarvis-bot";

// Initialize Jarvis bot
const jarvis = new JarvisBot({
  missionControlUrl: process.env.NEXT_PUBLIC_CONVEX_URL?.replace('3210', '3000') || 'http://localhost:3000',
  telegramEnabled: true,
  proactiveUpdates: true,
});

// POST /api/jarvis/chat - Chat with Jarvis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userId } = body;

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Process message through Jarvis
    const response = await jarvis.processCommand(message);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      botName: "Jarvis",
      emoji: "🎯",
    });
  } catch (error) {
    console.error("Jarvis chat error:", error);
    return NextResponse.json(
      { error: "Jarvis encountered an error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// GET /api/jarvis/chat - Test endpoint
export async function GET() {
  return NextResponse.json({
    message: "Jarvis is online and ready for commands!",
    availableCommands: [
      "status",
      "who's available?",
      "recent updates",
      "assign task to [agent]",
      "help",
    ],
    example: 'POST /api/jarvis/chat with {"message": "What\'s the current status?"}',
  });
}