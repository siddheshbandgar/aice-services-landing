export type AgentLevel = "lead" | "specialist" | "intern";
export type AgentStatus = "idle" | "working" | "blocked";
export type TaskStatus = "inbox" | "assigned" | "in_progress" | "review" | "done";
export type ActivityType = "task_created" | "message_sent" | "document_created" | "status_changed" | "agent_assigned";

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  level: AgentLevel;
  status: AgentStatus;
  sessionKey: string;
  currentTaskId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeIds: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  taskId: string;
  fromAgentId: string;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  agentId: string;
  message: string;
  taskTitle?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  type: "deliverable" | "research" | "protocol";
  taskId?: string;
  createdAt: string;
}
