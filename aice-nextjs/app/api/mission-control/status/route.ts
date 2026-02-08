import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// GET /api/mission-control/status - Get overall system status
export async function GET() {
  try {
    const agents = await convex.query(api.agents.getAll);
    const tasks = await convex.query(api.tasks.getAll);
    const recentActivities = await convex.query(api.activities.getRecent, { limit: 5 });

    const agentStats = {
      total: agents.length,
      working: agents.filter(a => a.status === "working").length,
      idle: agents.filter(a => a.status === "idle").length,
      blocked: agents.filter(a => a.status === "blocked").length,
    };

    const taskStats = {
      total: tasks.length,
      inbox: tasks.filter(t => t.status === "inbox").length,
      assigned: tasks.filter(t => t.status === "assigned").length,
      in_progress: tasks.filter(t => t.status === "in_progress").length,
      review: tasks.filter(t => t.status === "review").length,
      done: tasks.filter(t => t.status === "done").length,
    };

    return NextResponse.json({
      agentStats,
      taskStats,
      recentActivities,
      workingAgents: agents
        .filter(a => a.status === "working")
        .map(a => ({
          name: a.name,
          role: a.role,
          currentTaskId: a.currentTaskId,
        })),
    });
  } catch (error) {
    console.error("Status fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}