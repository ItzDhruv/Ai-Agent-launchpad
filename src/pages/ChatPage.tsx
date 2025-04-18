
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Send } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: number;
  }

 
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

function ChatPage() {
    const { agentId } = useParams();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
    const agent = agents.find(a => a.id === agentId);
    const navigate = useNavigate();

  

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    React.useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    if (!agent) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Agent Not Found</h2>
            <p className="text-gray-500 mb-4">The agent you're looking for doesn't exist</p>
            <button
              onClick={() => navigate('/explore')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Explore Agents
            </button>
          </div>
        </div>
      );
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
  
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: 'user',
        timestamp: Date.now(),
      };
  
      setMessages(prev => [...prev, userMessage]);
      setInput('');
  
      // Simulate agent response
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I am ${agent.name}, your ${agent.role}. How can I assist you today?`,
          sender: 'agent',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 1000);
    };
  
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold">{agent.name}</h1>
                <p className="text-sm text-gray-500">{agent.role}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Explore
            </button>
          </div>
        </div>
  
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto max-w-4xl">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
  
        {/* Input Form */}
        <div className="bg-white border-t p-4">
          <div className="container mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default ChatPage