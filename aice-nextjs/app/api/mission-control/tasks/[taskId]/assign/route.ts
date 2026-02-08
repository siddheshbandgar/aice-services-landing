import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// POST /api/mission-control/tasks/[taskId]/assign - Assign task to agents
export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await request.json();
    const { assigneeIds, notifyAgents = false } = body;
    const taskId = params.taskId as Id<"tasks">;

    if (!assigneeIds || !Array.isArray(assigneeIds)) {
      return NextResponse.json({ error: "assigneeIds array required" }, { status: 400 });
    }

    // Assign task to agents
    await convex.mutation(api.tasks.assign, {
      id: taskId,
      assigneeIds: assigneeIds as Id<"agents">[],
    });

    // Get task and agent details for notifications
    const task = await convex.query(api.tasks.getById, { id: taskId });
    const agents = await convex.query(api.agents.getAll);
    const assignedAgents = agents.filter(agent => assigneeIds.includes(agent._id));

    // Update agent status to working and set current task
    for (const agentId of assigneeIds) {
      await convex.mutation(api.agents.updateStatus, {
        id: agentId as Id<"agents">,
        status: "working",
        currentTaskId: taskId,
      });
    }

    // Log activity
    await convex.mutation(api.activities.create, {
      type: "agent_assigned",
      agentId: assigneeIds[0] as Id<"agents">, // Use first agent as activity creator
      message: `assigned to ${assignedAgents.map(a => a.name).join(", ")}`,
      taskTitle: task?.title,
    });

    const result = {
      task,
      assignedAgents: assignedAgents.map(agent => ({
        id: agent._id,
        name: agent.name,
        sessionKey: agent.sessionKey,
      })),
      notificationSent: notifyAgents,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Task assignment error:", error);
    return NextResponse.json({ error: "Failed to assign task" }, { status: 500 });
  }
}