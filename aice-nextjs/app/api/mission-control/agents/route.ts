import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// GET /api/mission-control/agents - Get all agents
export async function GET() {
  try {
    const agents = await convex.query(api.agents.getAll);
    return NextResponse.json({ agents });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}

// POST /api/mission-control/agents - Create new agent (for future use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, emoji, level, sessionKey, status = "idle" } = body;

    if (!name || !role || !sessionKey) {
      return NextResponse.json({ error: "name, role, and sessionKey required" }, { status: 400 });
    }

    const agent = await convex.mutation(api.agents.create, {
      name,
      role,
      emoji: emoji || "🤖",
      level: level || "specialist",
      status,
      sessionKey,
    });

    return NextResponse.json({ agent });
  } catch (error) {
    console.error("Create agent error:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}