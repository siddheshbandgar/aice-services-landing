import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// GET /api/mission-control/tasks - Get all tasks
export async function GET() {
  try {
    const tasks = await convex.query(api.tasks.getAll);
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST /api/mission-control/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, assigneeIds = [], tags = [], status = "inbox" } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    const task = await convex.mutation(api.tasks.create, {
      title,
      description,
      status,
      assigneeIds,
      tags,
    });

    return NextResponse.json({ task });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}