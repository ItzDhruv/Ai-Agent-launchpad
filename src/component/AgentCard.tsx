
import { Bot } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    description: string;
    provider: string;
    model: string;
    role: string;
    instructions: string;
  }
function AgentCard({ agent, onClick }: { agent: Agent, onClick: () => void }) {
    return (
      <div 
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{agent.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            {agent.provider} - {agent.model}
          </span>
        </div>
      </div>
    );
  }
  export default AgentCard