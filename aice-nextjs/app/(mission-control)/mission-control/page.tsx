import TopBar from "@/components/mission-control/TopBar";
import AgentSidebar from "@/components/mission-control/AgentSidebar";
import KanbanBoard from "@/components/mission-control/KanbanBoard";
import LiveFeed from "@/components/mission-control/LiveFeed";
import { mockAgents, mockTasks, mockActivities } from "@/lib/mission-control/mock-data";

export default function MissionControlPage() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar agents={mockAgents} tasks={mockTasks} />

      <div className="flex flex-1 overflow-hidden">
        <AgentSidebar agents={mockAgents} />

        <KanbanBoard tasks={mockTasks} agents={mockAgents} />

        <LiveFeed activities={mockActivities} agents={mockAgents} />
      </div>
    </div>
  );
}
