import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  agents: defineTable({
    name: v.string(),
    role: v.string(),
    emoji: v.string(),
    level: v.union(v.literal("lead"), v.literal("specialist"), v.literal("intern")),
    status: v.union(v.literal("idle"), v.literal("working"), v.literal("blocked")),
    sessionKey: v.string(),
    currentTaskId: v.optional(v.id("tasks")),
  }),

  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("inbox"),
      v.literal("assigned"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done")
    ),
    assigneeIds: v.array(v.id("agents")),
    tags: v.array(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }),

  messages: defineTable({
    taskId: v.id("tasks"),
    fromAgentId: v.id("agents"),
    content: v.string(),
    createdAt: v.string(),
  }),

  activities: defineTable({
    type: v.union(
      v.literal("task_created"),
      v.literal("message_sent"),
      v.literal("document_created"),
      v.literal("status_changed"),
      v.literal("agent_assigned")
    ),
    agentId: v.id("agents"),
    message: v.string(),
    taskTitle: v.optional(v.string()),
    createdAt: v.string(),
  }),

  documents: defineTable({
    title: v.string(),
    content: v.string(),
    type: v.union(v.literal("deliverable"), v.literal("research"), v.literal("protocol")),
    taskId: v.optional(v.id("tasks")),
    createdAt: v.string(),
  }),
});