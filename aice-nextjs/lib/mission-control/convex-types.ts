import { Doc, Id } from "@/convex/_generated/dataModel";
import { Agent, Task, Activity } from "./types";

// Transform Convex Agent document to frontend Agent type
export const transformAgent = (doc: Doc<"agents">): Agent => ({
  id: doc._id,
  name: doc.name,
  role: doc.role,
  emoji: doc.emoji,
  level: doc.level,
  status: doc.status,
  sessionKey: doc.sessionKey,
  currentTaskId: doc.currentTaskId,
});

// Transform Convex Task document to frontend Task type
export const transformTask = (doc: Doc<"tasks">): Task => ({
  id: doc._id,
  title: doc.title,
  description: doc.description,
  status: doc.status,
  assigneeIds: doc.assigneeIds,
  tags: doc.tags,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

// Transform Convex Activity document to frontend Activity type
export const transformActivity = (doc: Doc<"activities">): Activity => ({
  id: doc._id,
  type: doc.type,
  agentId: doc.agentId,
  message: doc.message,
  taskTitle: doc.taskTitle,
  createdAt: doc.createdAt,
});