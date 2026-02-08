"use client";

import { Agent } from "@/lib/mission-control/types";

interface AgentSidebarProps {
  agents: Agent[];
}

const statusColors: Record<string, string> = {
  working: "bg-green-500",
  idle: "bg-gray-300",
  blocked: "bg-red-400",
};

const statusLabels: Record<string, string> = {
  working: "WORKING",
  idle: "IDLE",
  blocked: "BLOCKED",
};

const levelColors: Record<string, string> = {
  lead: "badge-lead",
  specialist: "badge-specialist",
  intern: "badge-intern",
};

const levelLabels: Record<string, string> = {
  lead: "LEAD",
  specialist: "SPC",
  intern: "INT",
};

export default function AgentSidebar({ agents }: AgentSidebarProps) {
  return (
    <aside className="w-[220px] min-w-[220px] border-r border-[var(--mc-border)] bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-[var(--mc-border)] flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--mc-text-secondary)]">
          Agents
        </span>
        <span className="text-xs bg-[var(--mc-warm)] px-2 py-0.5 rounded-full text-[var(--mc-text-secondary)]">
          {agents.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto mc-scroll py-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--mc-warm)] cursor-pointer transition-colors"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[var(--mc-warm)] flex items-center justify-center text-lg">
                {agent.emoji}
              </div>
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusColors[agent.status]}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium truncate">{agent.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold ${levelColors[agent.level]}`}>
                  {levelLabels[agent.level]}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[11px] text-[var(--mc-text-secondary)] truncate">
                  {agent.role}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${statusColors[agent.status]} ${agent.status === "working" ? "status-pulse" : ""}`} />
                <span className="text-[10px] text-[var(--mc-text-secondary)] uppercase tracking-wider">
                  {statusLabels[agent.status]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-[var(--mc-border)]">
        <button className="w-full py-2 text-sm font-medium text-[var(--mc-accent)] border border-dashed border-[var(--mc-accent)] rounded-md hover:bg-[var(--mc-accent-light)] transition-colors">
          + Add Agent
        </button>
      </div>
    </aside>
  );
}
