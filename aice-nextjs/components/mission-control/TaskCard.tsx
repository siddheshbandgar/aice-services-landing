"use client";

import { Task, Agent } from "@/lib/mission-control/types";

interface TaskCardProps {
  task: Task;
  agents: Agent[];
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function TaskCard({ task, agents }: TaskCardProps) {
  const assignees = agents.filter((a) => task.assigneeIds.includes(a.id));

  return (
    <div className="bg-white rounded-lg border border-[var(--mc-border)] p-3.5 mb-2.5 hover:shadow-md transition-shadow cursor-pointer group">
      <h4 className="text-sm font-medium leading-snug mb-2 group-hover:text-[var(--mc-accent)] transition-colors">
        {task.title}
      </h4>
      <p className="text-xs text-[var(--mc-text-secondary)] leading-relaxed mb-3 line-clamp-2">
        {task.description}
      </p>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--mc-warm)] text-[var(--mc-text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {assignees.map((agent) => (
            <div
              key={agent.id}
              className="w-6 h-6 rounded-full bg-[var(--mc-warm)] flex items-center justify-center text-xs border-2 border-white"
              title={agent.name}
            >
              {agent.emoji}
            </div>
          ))}
        </div>
        <span className="text-[10px] text-[var(--mc-text-secondary)]">
          {timeAgo(task.updatedAt)}
        </span>
      </div>
    </div>
  );
}
