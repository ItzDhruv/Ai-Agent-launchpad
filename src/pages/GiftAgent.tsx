import React, { useState, useEffect } from 'react';
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

function GiftAgentPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [recipient, setRecipient] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
    setAgents(storedAgents);
  }, []);

  const handleSendGift = () => {
    // TODO: Replace this with smart contract logic
    console.log(`Sending agent "${selectedAgent?.name}" to ${recipient}`);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setSelectedAgent(null);
      setRecipient('');
    }, 2000);
  };

  return (
    <>
      <Navigation />
      <div className="p-6">
        {/* Centered Title */}
        <h1 className="text-3xl font-bold text-center mb-6">🎁 Gift an Agent</h1>

        {agents.length === 0 ? (
          <div className="text-center text-gray-600">No agents found. Create one first.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} onClick={() => setSelectedAgent(agent)} className="cursor-pointer">
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gift Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Gift: {selectedAgent.name}</h2>
            <p className="text-gray-600 mb-4">{selectedAgent.description}</p>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter recipient wallet address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <button
              onClick={handleSendGift}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              disabled={!recipient || isSent}
            >
              {isSent ? 'Sent ✅' : 'Send Gift'}
            </button>
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-sm text-gray-500 mt-3 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GiftAgentPage;
