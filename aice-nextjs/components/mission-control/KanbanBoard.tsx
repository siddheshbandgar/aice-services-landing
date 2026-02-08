"use client";

import { Task, Agent, TaskStatus } from "@/lib/mission-control/types";
import TaskCard from "./TaskCard";

interface KanbanBoardProps {
  tasks: Task[];
  agents: Agent[];
}

const columns: { status: TaskStatus; label: string; icon: string }[] = [
  { status: "inbox", label: "Inbox", icon: "📥" },
  { status: "assigned", label: "Assigned", icon: "📋" },
  { status: "in_progress", label: "In Progress", icon: "⚡" },
  { status: "review", label: "Review", icon: "👀" },
  { status: "done", label: "Done", icon: "✅" },
];

export default function KanbanBoard({ tasks, agents }: KanbanBoardProps) {
  return (
    <div className="flex-1 overflow-x-auto">
      <div className="px-4 py-3 border-b border-[var(--mc-border)] bg-white">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--mc-text-secondary)]">
          Mission Queue
        </span>
      </div>

      <div className="flex gap-4 p-4 h-[calc(100%-48px)] overflow-x-auto">
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="kanban-column flex-shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="text-sm">{col.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--mc-text-secondary)]">
                  {col.label}
                </span>
                <span className="text-[10px] bg-[var(--mc-warm)] text-[var(--mc-text-secondary)] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto mc-scroll space-y-0">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} agents={agents} />
                ))}

                {columnTasks.length === 0 && (
                  <div className="flex items-center justify-center h-24 border border-dashed border-[var(--mc-border)] rounded-lg">
                    <span className="text-xs text-[var(--mc-text-secondary)]">No tasks</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
