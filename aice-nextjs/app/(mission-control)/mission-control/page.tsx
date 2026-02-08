"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { transformAgent, transformTask, transformActivity } from "@/lib/mission-control/convex-types";
import TopBar from "@/components/mission-control/TopBar";
import AgentSidebar from "@/components/mission-control/AgentSidebar";
import KanbanBoard from "@/components/mission-control/KanbanBoard";
import LiveFeed from "@/components/mission-control/LiveFeed";

export default function MissionControlPage() {
  const rawAgents = useQuery(api.agents.getAll) || [];
  const rawTasks = useQuery(api.tasks.getAll) || [];
  const rawActivities = useQuery(api.activities.getRecent, { limit: 20 }) || [];

  // Transform Convex documents to frontend types
  const agents = rawAgents.map(transformAgent);
  const tasks = rawTasks.map(transformTask);
  const activities = rawActivities.map(transformActivity);

  if (!agents.length || !tasks.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBar agents={agents} tasks={tasks} />

      <div className="flex flex-1 overflow-hidden">
        <AgentSidebar agents={agents} />

        <KanbanBoard tasks={tasks} agents={agents} />

        <LiveFeed activities={activities} agents={agents} />
      </div>
    </div>
  );
}