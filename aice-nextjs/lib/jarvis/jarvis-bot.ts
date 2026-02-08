/**
 * Jarvis - Squad Lead Bot
 * Handles task assignments and mission control through Telegram and API calls
 */

interface MissionControlAPI {
  getTasks(): Promise<any>;
  getAgents(): Promise<any>;
  getStatus(): Promise<any>;
  assignTask(taskId: string, agentIds: string[]): Promise<any>;
  createTask(title: string, description: string, tags?: string[]): Promise<any>;
}

interface JarvisConfig {
  missionControlUrl: string;
  telegramEnabled: boolean;
  proactiveUpdates: boolean;
}

export class JarvisBot {
  private config: JarvisConfig;
  private api: MissionControlAPI;

  constructor(config: JarvisConfig) {
    this.config = config;
    this.api = new MissionControlAPIClient(config.missionControlUrl);
  }

  // Main command processor for Telegram messages
  async processCommand(message: string): Promise<string> {
    const cmd = message.toLowerCase().trim();

    // Status commands
    if (cmd.includes('status') || cmd.includes('overview')) {
      return await this.getStatusReport();
    }

    // Assignment commands
    if (cmd.includes('assign') && (cmd.includes('task') || cmd.includes('to'))) {
      return await this.handleTaskAssignment(message);
    }

    // Agent availability
    if (cmd.includes('who') && (cmd.includes('available') || cmd.includes('free'))) {
      return await this.getAvailableAgents();
    }

    // Task creation
    if (cmd.includes('create task') || cmd.includes('new task')) {
      return await this.handleTaskCreation(message);
    }

    // Recent updates
    if (cmd.includes('update') || cmd.includes('recent') || cmd.includes('activity')) {
      return await this.getRecentActivity();
    }

    // Default help
    return this.getHelpMessage();
  }

  // Get system status report
  async getStatusReport(): Promise<string> {
    try {
      const status = await this.api.getStatus();
      const { agentStats, taskStats, workingAgents } = status;

      let report = `📊 **Mission Control Status**\n\n`;
      report += `👥 **Agents:** ${agentStats.working} working, ${agentStats.idle} idle`;
      if (agentStats.blocked > 0) report += `, ${agentStats.blocked} blocked`;
      report += `\n`;
      
      report += `📋 **Tasks:** ${taskStats.in_progress} in progress, ${taskStats.review} in review, ${taskStats.inbox} unassigned\n\n`;

      if (workingAgents.length > 0) {
        report += `🔄 **Currently Working:**\n`;
        for (const agent of workingAgents) {
          report += `• ${agent.name} (${agent.role})\n`;
        }
      }

      return report;
    } catch (error) {
      return `❌ Failed to get status: ${error}`;
    }
  }

  // Handle task assignment from natural language
  async handleTaskAssignment(message: string): Promise<string> {
    try {
      const tasks = await this.api.getTasks();
      const agents = await this.api.getAgents();

      // Simple parsing - in production would use better NLP
      const agentNames = agents.agents.map(a => a.name.toLowerCase());
      const foundAgent = agentNames.find(name => message.toLowerCase().includes(name));
      
      if (!foundAgent) {
        const availableAgents = agents.agents
          .filter(a => a.status === 'idle')
          .map(a => `${a.name} (${a.role})`)
          .join(', ');
        return `🤔 Which agent should I assign this to?\nAvailable: ${availableAgents}`;
      }

      // Find task by keywords or show list
      const unassignedTasks = tasks.tasks.filter(t => 
        t.status === 'inbox' || t.assigneeIds.length === 0
      );

      if (unassignedTasks.length === 0) {
        return `📋 All tasks are currently assigned. Use "create task" to add a new one.`;
      }

      // For now, return manual assignment options
      // In production, would implement better task matching
      const taskList = unassignedTasks
        .map((t, i) => `${i + 1}. ${t.title}`)
        .join('\n');

      return `🎯 **Unassigned Tasks:**\n${taskList}\n\nReply with the task number to assign to ${foundAgent}`;

    } catch (error) {
      return `❌ Assignment failed: ${error}`;
    }
  }

  // Get available agents
  async getAvailableAgents(): Promise<string> {
    try {
      const agents = await this.api.getAgents();
      const available = agents.agents.filter(a => a.status === 'idle');
      const busy = agents.agents.filter(a => a.status === 'working');

      let response = `👥 **Agent Availability**\n\n`;
      
      if (available.length > 0) {
        response += `✅ **Available:**\n`;
        for (const agent of available) {
          response += `• ${agent.emoji} ${agent.name} - ${agent.role}\n`;
        }
        response += '\n';
      }

      if (busy.length > 0) {
        response += `🔄 **Currently Working:**\n`;
        for (const agent of busy) {
          response += `• ${agent.emoji} ${agent.name} - ${agent.role}\n`;
        }
      }

      return response;
    } catch (error) {
      return `❌ Failed to get agent status: ${error}`;
    }
  }

  // Handle task creation
  async handleTaskCreation(message: string): Promise<string> {
    // Simple task creation - would improve with better parsing
    return `🚧 Task creation coming soon! For now, use the Mission Control dashboard to create tasks.`;
  }

  // Get recent activity
  async getRecentActivity(): Promise<string> {
    try {
      const status = await this.api.getStatus();
      const activities = status.recentActivities;

      if (!activities || activities.length === 0) {
        return `📭 No recent activity.`;
      }

      let response = `🔔 **Recent Activity:**\n\n`;
      for (const activity of activities.slice(0, 5)) {
        const timestamp = new Date(activity.createdAt).toLocaleTimeString();
        response += `• ${timestamp} - ${activity.message}`;
        if (activity.taskTitle) response += ` (${activity.taskTitle})`;
        response += '\n';
      }

      return response;
    } catch (error) {
      return `❌ Failed to get recent activity: ${error}`;
    }
  }

  // Help message
  getHelpMessage(): string {
    return `🎯 **Jarvis Commands:**

**Status & Info:**
• "status" - Get system overview
• "who's available?" - See free agents
• "recent updates" - Latest activity

**Task Management:**
• "assign [task] to [agent]" - Assign tasks
• "create task" - Add new task

**Examples:**
• "What's the current status?"
• "Assign the React task to Friday"
• "Who's available to work on SEO?"

I'm your squad lead - let me know what you need! 💪`;
  }
}

// API Client for Mission Control
class MissionControlAPIClient implements MissionControlAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTasks(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/mission-control/tasks`);
    return response.json();
  }

  async getAgents(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/mission-control/agents`);
    return response.json();
  }

  async getStatus(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/mission-control/status`);
    return response.json();
  }

  async assignTask(taskId: string, agentIds: string[]): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/mission-control/tasks/${taskId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assigneeIds: agentIds, notifyAgents: true }),
    });
    return response.json();
  }

  async createTask(title: string, description: string, tags: string[] = []): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/mission-control/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tags }),
    });
    return response.json();
  }
}