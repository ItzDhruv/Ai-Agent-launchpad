import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Search } from 'lucide-react';
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

function ExplorePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load agents from localStorage
  React.useEffect(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem('agents');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAgents(parsed);
        } else {
          console.warn('Agents in localStorage is not an array');
          setAgents([]);
        }
      } else {
        // If no agents found in localStorage
        setAgents([]);
      }
    } catch (error) {
      console.error('Failed to parse agents from localStorage:', error);
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter agents based on search term
  const filteredAgents = React.useMemo(() => {
    if (!searchTerm.trim()) return agents;
    
    return agents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [agents, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore AI Agents</h1>
          <p className="text-xl text-indigo-100 mb-8">
            Discover and chat with AI agents created by the community
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents by name, description, or role..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading agents...</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              {agents.length === 0 
                ? "No agents found in your collection" 
                : "No agents match your search"}
            </h2>
            <p className="text-gray-500 mb-4">
              {agents.length === 0 
                ? "Get started by creating your first agent" 
                : "Try adjusting your search terms"}
            </p>
            <button
              onClick={() => navigate('/create')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
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

export default ExplorePage;