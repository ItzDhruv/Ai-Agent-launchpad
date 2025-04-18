import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot} from 'lucide-react';
import Navigation from '../component/Navigation';
import AgentCard from '../component/AgentCard';

interface Agent {
    id: string;
    name: string;
    description: string;
    provider: string;
    model: string;
    role: string;
    instructions: string;
    tokenName: string;
    tokenSymbol: string;
    tokenSupply: string;
  }

function DashboardPage() {
    const navigate = useNavigate();
    const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your AI Agents</h1>
            <button
              onClick={() => navigate('/create')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create New Agent
            </button>
          </div>
  
          {agents.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Agents Yet</h2>
              <p className="text-gray-500 mb-4">Create your first AI agent to get started</p>
              <button
                onClick={() => navigate('/create')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Agent
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => navigate(`/chat/${agent.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  export default DashboardPage;