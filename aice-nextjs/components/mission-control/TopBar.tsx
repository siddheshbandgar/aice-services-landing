"use client";

import { Agent, Task } from "@/lib/mission-control/types";

interface TopBarProps {
  agents: Agent[];
  tasks: Task[];
}

export default function TopBar({ agents, tasks }: TopBarProps) {
  const activeAgents = agents.filter((a) => a.status === "working").length;
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--mc-border)] bg-white">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-[var(--mc-accent)] flex items-center justify-center">
          <span className="text-white text-xs">⚡</span>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">MISSION CONTROL</h1>
        <span className="text-sm text-[var(--mc-text-secondary)] ml-2">AICE</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold">{agents.length}</div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--mc-text-secondary)]">
            Agents Active
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{tasks.length}</div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--mc-text-secondary)]">
            Tasks in Queue
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-3 py-1.5 text-sm border border-[var(--mc-border)] rounded-md hover:bg-[var(--mc-warm)] transition-colors">
          📄 Docs
        </button>
        <div className="text-right">
          <div className="text-sm font-mono">{timeStr}</div>
          <div className="text-[10px] text-[var(--mc-text-secondary)]">{dateStr}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 status-pulse"></div>
          <span className="text-xs font-medium text-green-700">ONLINE</span>
        </div>
      </div>
    </header>
  );
}
