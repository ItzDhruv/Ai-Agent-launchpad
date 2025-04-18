import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function Navigation() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Bot className="w-7 h-7 text-green-600" />
          <span className="text-xl font-bold text-gray-900">AI Launchpad</span>
        </Link>

        {/* Center nav links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80"
          >
            Explore
          </Link>
          <Link
            to="/dashboard"
            className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-80"
          >
            Profile
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Create Agent - only show when connected */}
          {isConnected && (
            <Link
              to="/create"
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Agent
            </Link>
          )}

          {/* Wallet connect/disconnect button with address */}
          <button
            onClick={() =>
              isConnected ? disconnect() : connect({ connector: injected() })
            }
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {isConnected
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
