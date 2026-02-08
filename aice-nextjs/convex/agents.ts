import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all agents
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

// Get agent by ID
export const getById = query({
  args: { id: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update agent status
export const updateStatus = mutation({
  args: {
    id: v.id("agents"),
    status: v.union(v.literal("idle"), v.literal("working"), v.literal("blocked")),
    currentTaskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    const { id, status, currentTaskId } = args;
    return await ctx.db.patch(id, { status, currentTaskId });
  },
});

// Create a new agent
export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    emoji: v.string(),
    level: v.union(v.literal("lead"), v.literal("specialist"), v.literal("intern")),
    status: v.union(v.literal("idle"), v.literal("working"), v.literal("blocked")),
    sessionKey: v.string(),
    currentTaskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("agents", args);
  },
});