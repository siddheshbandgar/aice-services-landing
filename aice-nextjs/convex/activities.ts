import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get recent activities (latest first)
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("activities")
      .order("desc")
      .take(limit);
  },
});

// Get activities for a specific agent
export const getByAgent = query({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .filter((q) => q.eq(q.field("agentId"), args.agentId))
      .order("desc")
      .collect();
  },
});

// Create a new activity
export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("activities", {
      ...args,
      createdAt: now,
    });
  },
});