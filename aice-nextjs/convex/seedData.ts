import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingAgents = await ctx.db.query("agents").collect();
    const existingTasks = await ctx.db.query("tasks").collect();
    const existingActivities = await ctx.db.query("activities").collect();
    
    for (const agent of existingAgents) {
      await ctx.db.delete(agent._id);
    }
    for (const task of existingTasks) {
      await ctx.db.delete(task._id);
    }
    for (const activity of existingActivities) {
      await ctx.db.delete(activity._id);
    }

    // Create agents
    const agentIds: Record<string, any> = {};
    
    const agents = [
      { name: "Jarvis", role: "Squad Lead", emoji: "🎯", level: "lead" as const, status: "working" as const, sessionKey: "agent:main:main" },
      { name: "Friday", role: "Developer", emoji: "💻", level: "specialist" as const, status: "working" as const, sessionKey: "agent:developer:main" },
      { name: "Shuri", role: "Product Analyst", emoji: "🔍", level: "specialist" as const, status: "idle" as const, sessionKey: "agent:product-analyst:main" },
      { name: "Fury", role: "Customer Researcher", emoji: "🕵️", level: "specialist" as const, status: "working" as const, sessionKey: "agent:customer-researcher:main" },
      { name: "Vision", role: "SEO Analyst", emoji: "📊", level: "specialist" as const, status: "idle" as const, sessionKey: "agent:seo-analyst:main" },
      { name: "Loki", role: "Content Writer", emoji: "✍️", level: "specialist" as const, status: "working" as const, sessionKey: "agent:content-writer:main" },
      { name: "Pepper", role: "Email Marketing", emoji: "📧", level: "intern" as const, status: "idle" as const, sessionKey: "agent:email-marketing:main" },
      { name: "Quill", role: "Social Media", emoji: "📱", level: "specialist" as const, status: "idle" as const, sessionKey: "agent:social-media:main" },
    ];

    for (const agent of agents) {
      const id = await ctx.db.insert("agents", agent);
      agentIds[agent.name] = id;
    }

    // Create tasks
    const tasks = [
      {
        title: "Set Up Mission Control Infrastructure",
        description: "Initialize Convex database, create schema, and set up the shared backend for all agents.",
        status: "in_progress" as const,
        assigneeIds: [agentIds["Jarvis"], agentIds["Friday"]],
        tags: ["infrastructure", "priority"],
        createdAt: "2026-02-08T10:00:00Z",
        updatedAt: "2026-02-08T16:30:00Z",
      },
      {
        title: "Build Mission Control Dashboard UI",
        description: "Create the Next.js frontend with kanban board, agent sidebar, and live activity feed.",
        status: "in_progress" as const,
        assigneeIds: [agentIds["Friday"]],
        tags: ["frontend", "ui"],
        createdAt: "2026-02-08T10:15:00Z",
        updatedAt: "2026-02-08T17:00:00Z",
      },
      {
        title: "Write Landing Page Copy for AI Agents",
        description: "Create compelling copy for the aice.services/mission-control showcase page.",
        status: "assigned" as const,
        assigneeIds: [agentIds["Loki"]],
        tags: ["content", "marketing"],
        createdAt: "2026-02-08T11:00:00Z",
        updatedAt: "2026-02-08T11:00:00Z",
      },
      {
        title: "Research Competitor AI Agent Platforms",
        description: "Analyze competing AI agent platforms and their pricing, features, and positioning.",
        status: "in_progress" as const,
        assigneeIds: [agentIds["Fury"], agentIds["Vision"]],
        tags: ["research", "competitive"],
        createdAt: "2026-02-07T09:00:00Z",
        updatedAt: "2026-02-08T14:00:00Z",
      },
      {
        title: "Design Agent Onboarding Flow",
        description: "Create the UX flow for adding and configuring new agents from the Mission Control UI.",
        status: "inbox" as const,
        assigneeIds: [],
        tags: ["ux", "design"],
        createdAt: "2026-02-08T16:00:00Z",
        updatedAt: "2026-02-08T16:00:00Z",
      },
      {
        title: "Set Up Email Drip Sequence for Beta Users",
        description: "Create a 5-email welcome sequence for early Mission Control beta users.",
        status: "inbox" as const,
        assigneeIds: [],
        tags: ["email", "marketing"],
        createdAt: "2026-02-08T15:00:00Z",
        updatedAt: "2026-02-08T15:00:00Z",
      },
      {
        title: "SEO Audit for aice.services",
        description: "Full SEO audit including meta tags, page speed, and keyword opportunities.",
        status: "review" as const,
        assigneeIds: [agentIds["Vision"]],
        tags: ["seo", "audit"],
        createdAt: "2026-02-06T10:00:00Z",
        updatedAt: "2026-02-08T12:00:00Z",
      },
      {
        title: "Create Social Media Launch Plan",
        description: "Plan the social media campaign for Mission Control launch on Twitter/LinkedIn.",
        status: "done" as const,
        assigneeIds: [agentIds["Quill"]],
        tags: ["social", "launch"],
        createdAt: "2026-02-05T10:00:00Z",
        updatedAt: "2026-02-07T18:00:00Z",
      },
    ];

    const taskIds = [];
    for (const task of tasks) {
      const id = await ctx.db.insert("tasks", task);
      taskIds.push(id);
    }

    // Update agents with current task assignments
    await ctx.db.patch(agentIds["Jarvis"], { currentTaskId: taskIds[0] });
    await ctx.db.patch(agentIds["Friday"], { currentTaskId: taskIds[1] });
    await ctx.db.patch(agentIds["Loki"], { currentTaskId: taskIds[2] });
    await ctx.db.patch(agentIds["Fury"], { currentTaskId: taskIds[3] });

    // Create activities
    const activities = [
      {
        type: "message_sent" as const,
        agentId: agentIds["Friday"],
        message: "commented on",
        taskTitle: "Build Mission Control Dashboard UI",
        createdAt: "2026-02-08T17:10:00Z",
      },
      {
        type: "status_changed" as const,
        agentId: agentIds["Fury"],
        message: "moved to In Progress",
        taskTitle: "Research Competitor AI Agent Platforms",
        createdAt: "2026-02-08T17:05:00Z",
      },
      {
        type: "message_sent" as const,
        agentId: agentIds["Loki"],
        message: "commented on",
        taskTitle: "Write Landing Page Copy for AI Agents",
        createdAt: "2026-02-08T16:55:00Z",
      },
      {
        type: "task_created" as const,
        agentId: agentIds["Jarvis"],
        message: "created task",
        taskTitle: "Design Agent Onboarding Flow",
        createdAt: "2026-02-08T16:00:00Z",
      },
      {
        type: "document_created" as const,
        agentId: agentIds["Vision"],
        message: "created document on",
        taskTitle: "SEO Audit for aice.services",
        createdAt: "2026-02-08T12:00:00Z",
      },
      {
        type: "agent_assigned" as const,
        agentId: agentIds["Jarvis"],
        message: "assigned Fury to",
        taskTitle: "Research Competitor AI Agent Platforms",
        createdAt: "2026-02-08T11:30:00Z",
      },
      {
        type: "message_sent" as const,
        agentId: agentIds["Shuri"],
        message: "commented on",
        taskTitle: "Build Mission Control Dashboard UI",
        createdAt: "2026-02-08T11:00:00Z",
      },
      {
        type: "status_changed" as const,
        agentId: agentIds["Quill"],
        message: "moved to Done",
        taskTitle: "Create Social Media Launch Plan",
        createdAt: "2026-02-07T18:00:00Z",
      },
    ];

    for (const activity of activities) {
      await ctx.db.insert("activities", activity);
    }

    return { 
      message: "Database seeded successfully!",
      agentCount: agents.length,
      taskCount: tasks.length,
      activityCount: activities.length
    };
  },
});