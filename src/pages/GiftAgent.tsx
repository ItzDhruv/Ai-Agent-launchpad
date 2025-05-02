import React, { useState, useEffect } from 'react';
import Navigation from '../component/Navigation';
import AgentCard from '../component/AgentCard';
import toast, { Toaster } from 'react-hot-toast';

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

  const truncateAddress = (address: string) =>
    address.length > 12 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  const handleSendGift = () => {
    setIsSent(true);

    setTimeout(() => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gradient-to-r from-fuchsia-600 via-violet-500 to-indigo-500 p-1 rounded-lg shadow-lg`}
        >
          <div className="bg-gray-900 text-white rounded-md p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">🎁</div>
              <div>
                <p className="text-lg font-bold mb-1">Agent Gifted!</p>
                <p className="text-sm text-gray-300">
                  <strong>{selectedAgent?.name}</strong> sent to{' '}
                  <span className="font-mono bg-gray-800 px-2 py-0.5 rounded">
                    {truncateAddress(recipient)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ));

      setIsSent(false);
      setSelectedAgent(null);
      setRecipient('');
    }, 3000);
  };

  return (
    <>
      <Navigation />
      <Toaster position="top-center" />
      <div className="p-6">
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full flex justify-center items-center gap-2"
              disabled={!recipient || isSent}
            >
              {isSent ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Gift'
              )}
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
