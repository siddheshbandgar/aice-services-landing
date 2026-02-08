"use client";

import { Activity, Agent } from "@/lib/mission-control/types";

interface LiveFeedProps {
  activities: Activity[];
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
  if (diffMin < 60) return `about ${diffMin}m ago`;
  if (diffHours < 24) return `about ${diffHours}h ago`;
  return `${diffDays}d ago`;
}

const filterTabs = ["All", "Tasks", "Comments", "Documents", "Status"];

export default function LiveFeed({ activities, agents }: LiveFeedProps) {
  const getAgent = (id: string) => agents.find((a) => a.id === id);

  return (
    <aside className="w-[320px] min-w-[320px] border-l border-[var(--mc-border)] bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-[var(--mc-border)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--mc-text-secondary)]">
            Live Feed
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse" />
            <span className="text-[10px] text-green-600 font-medium">LIVE</span>
          </div>
        </div>

        <div className="flex gap-1 flex-wrap">
          {filterTabs.map((tab, i) => (
            <button
              key={tab}
              className={`text-[11px] px-2 py-1 rounded-md transition-colors ${
                i === 0
                  ? "bg-[var(--mc-accent)] text-white"
                  : "text-[var(--mc-text-secondary)] hover:bg-[var(--mc-warm)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 border-b border-[var(--mc-border)]">
        <div className="flex gap-1 overflow-x-auto">
          <button className="text-[11px] px-2 py-1 bg-[var(--mc-warm)] rounded-md text-[var(--mc-text-secondary)] whitespace-nowrap">
            All Agents
          </button>
          {agents.slice(0, 5).map((agent) => (
            <button
              key={agent.id}
              className="text-[11px] px-2 py-1 rounded-md text-[var(--mc-text-secondary)] hover:bg-[var(--mc-warm)] whitespace-nowrap transition-colors"
            >
              {agent.emoji} {agent.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mc-scroll">
        {activities.map((activity) => {
          const agent = getAgent(activity.agentId);
          if (!agent) return null;

          return (
            <div
              key={activity.id}
              className="px-4 py-3 border-b border-[var(--mc-border)] hover:bg-[var(--mc-warm)] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--mc-warm)] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {agent.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{agent.name}</span>{" "}
                    <span className="text-[var(--mc-text-secondary)]">{activity.message}</span>{" "}
                    {activity.taskTitle && (
                      <span className="font-medium text-[var(--mc-accent)]">
                        &ldquo;{activity.taskTitle}&rdquo;
                      </span>
                    )}
                  </p>
                  <span className="text-[10px] text-[var(--mc-text-secondary)] mt-1 block">
                    {agent.name} · {timeAgo(activity.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
