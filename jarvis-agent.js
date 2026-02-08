#!/usr/bin/env node
/**
 * Jarvis Agent - Squad Lead Bot for Mission Control
 * 
 * This script runs Jarvis as an OpenClaw agent that can:
 * - Receive messages from Telegram (via you)
 * - Manage other agents through Mission Control API
 * - Send task assignments via sessions_send
 * - Report status and updates back to you
 * 
 * Usage:
 * 1. Run this as a background OpenClaw agent session
 * 2. Send Jarvis commands via your main chat
 * 3. Jarvis processes commands and responds with updates
 */

// This would be run as: sessions_spawn("jarvis-squad-lead", "./jarvis-agent.js")

const MISSION_CONTROL_URL = process.env.MISSION_CONTROL_URL || 'http://localhost:3000';

class JarvisAgent {
  constructor() {
    this.name = "Jarvis";
    this.role = "Squad Lead";
    this.emoji = "🎯";
  }

  async processMessage(message, context) {
    console.log(`Jarvis received: ${message}`);
    
    try {
      // Use the Jarvis bot logic
      const response = await this.sendToJarvisAPI(message);
      
      // If this is a task assignment, also notify the target agents
      if (message.includes('assign') && response.includes('assigned')) {
        await this.notifyAgentsOfAssignment(message, response);
      }
      
      return response;
    } catch (error) {
      console.error('Jarvis error:', error);
      return `❌ Sorry, I encountered an error: ${error.message}`;
    }
  }

  async sendToJarvisAPI(message) {
    const response = await fetch(`${MISSION_CONTROL_URL}/api/jarvis/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    return data.response || data.error || 'No response from Jarvis API';
  }

  async notifyAgentsOfAssignment(originalMessage, response) {
    // Parse which agents were mentioned and send them task notifications
    const agentSessions = {
      'friday': 'agent:developer:main',
      'shuri': 'agent:product-analyst:main', 
      'fury': 'agent:customer-researcher:main',
      'vision': 'agent:seo-analyst:main',
      'loki': 'agent:content-writer:main',
      'pepper': 'agent:email-marketing:main',
      'quill': 'agent:social-media:main',
    };

    for (const [agentName, sessionKey] of Object.entries(agentSessions)) {
      if (originalMessage.toLowerCase().includes(agentName)) {
        try {
          // This would use the OpenClaw sessions_send function
          // For now, we'll log what would be sent
          console.log(`Would send to ${sessionKey}: New task assigned - ${response}`);
          
          // In real implementation:
          // await sessions_send({
          //   sessionKey,
          //   message: `🎯 New task assigned by Jarvis: ${response}`
          // });
          
        } catch (error) {
          console.error(`Failed to notify ${agentName}:`, error);
        }
      }
    }
  }

  async getProactiveUpdates() {
    // Check for status changes that should be reported proactively
    try {
      const status = await fetch(`${MISSION_CONTROL_URL}/api/mission-control/status`);
      const data = await status.json();
      
      // Look for completed tasks, blocked agents, etc.
      const updates = [];
      
      if (data.agentStats.blocked > 0) {
        updates.push(`⚠️ ${data.agentStats.blocked} agent(s) are blocked and need attention`);
      }
      
      // Check for recently completed tasks (would need timestamps)
      if (data.taskStats.review > 0) {
        updates.push(`📋 ${data.taskStats.review} task(s) ready for your review`);
      }
      
      return updates;
    } catch (error) {
      console.error('Failed to get proactive updates:', error);
      return [];
    }
  }
}

// Main execution (this would run in an OpenClaw agent session)
async function main() {
  const jarvis = new JarvisAgent();
  
  console.log('🎯 Jarvis Squad Lead Agent started');
  console.log('Ready to receive commands and manage the team!');
  
  // In a real OpenClaw agent, this would be handled by the messaging system
  // For testing, we can simulate some interactions
  
  if (process.argv[2]) {
    const testMessage = process.argv.slice(2).join(' ');
    console.log('Testing with message:', testMessage);
    const response = await jarvis.processMessage(testMessage);
    console.log('Jarvis response:', response);
  }

  // Proactive monitoring loop (would run periodically)
  setInterval(async () => {
    const updates = await jarvis.getProactiveUpdates();
    if (updates.length > 0) {
      console.log('🔔 Proactive updates:', updates);
      // Would send these back to the main chat session
    }
  }, 60000); // Check every minute
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { JarvisAgent };