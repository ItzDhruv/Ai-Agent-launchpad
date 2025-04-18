import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Send, ArrowLeft, TrendingUp, BarChart, Wallet, CreditCard, ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react';

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

interface TradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    tradeType: 'buy' | 'sell';
    tokenSymbol: string;
    tokenName: string;
    tokenPrice: number;
}

function TradeModal({ isOpen, onClose, tradeType, tokenSymbol, tokenName, tokenPrice }: TradeModalProps) {
    const [ethAmount, setEthAmount] = React.useState('');
    const conversionRate = 1000; // 1 ETH = 1000 tokens
    
    if (!isOpen) return null;
    
    const tokenAmount = parseFloat(ethAmount) * conversionRate || 0;
    const totalCost = parseFloat(ethAmount) || 0;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the actual transaction
        // For now we'll just close the modal
        alert(`${tradeType === 'buy' ? 'Bought' : 'Sold'} ${tokenAmount} ${tokenSymbol} tokens for ${totalCost} ETH`);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-800">
                        {tradeType === 'buy' ? 'Buy' : 'Sell'} {tokenName} Tokens
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Amount in ETH
                        </label>
                        <input
                            type="number"
                            value={ethAmount}
                            onChange={(e) => setEthAmount(e.target.value)}
                            placeholder="Enter ETH amount"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Conversion Rate:</span>
                            <span className="font-medium">1 ETH = {conversionRate} {tokenSymbol}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Token Price:</span>
                            <span className="font-medium">${tokenPrice} per {tokenSymbol}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                            <span className="text-gray-800 font-medium">You will {tradeType === 'buy' ? 'receive' : 'sell'}:</span>
                            <span className="font-bold text-indigo-600">{tokenAmount.toFixed(2)} {tokenSymbol}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600">
                            Total: <span className="font-bold text-gray-800">{totalCost.toFixed(2)} ETH</span>
                        </div>
                        <button
                            type="submit"
                            className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
                                tradeType === 'buy' 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-red-600 hover:bg-red-700'
                            } transition-colors`}
                            disabled={!ethAmount || parseFloat(ethAmount) <= 0}
                        >
                            Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ChatPage() {
    const { agentId } = useParams();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const agents = JSON.parse(localStorage.getItem('agents') || '[]') as Agent[];
    const agent = agents.find(a => a.id === agentId);
    const navigate = useNavigate();
    
    // Modal state
    const [tradeModalOpen, setTradeModalOpen] = React.useState(false);
    const [tradeType, setTradeType] = React.useState<'buy' | 'sell'>('buy');
    
    // Mock token data - would be fetched from API in real application
    const [tokenData, setTokenData] = React.useState({
        price: 0.0425,
        priceChange: 5.3,
        balance: 124.56,
        value: 5.29,
        chartData: [25, 30, 28, 32, 35, 40, 38, 42, 45, 48, 44, 50]
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    React.useEffect(() => {
        // Welcome message when chat starts
        if (agent && messages.length === 0) {
            setTimeout(() => {
                const welcomeMessage: Message = {
                    id: Date.now().toString(),
                    content: `Hello! I'm ${agent.name}, your ${agent.role}. How can I assist you today?`,
                    sender: 'agent',
                    timestamp: Date.now(),
                };
                setMessages([welcomeMessage]);
            }, 500);
        }
    }, [agent]);

    if (!agent) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <Bot className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Agent Not Found</h2>
                    <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist or may have been removed.</p>
                    <button
                        onClick={() => navigate('/explore')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
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
                content: `As ${agent.name}, I'm here to help with your request. Can you tell me more about what you need?`,
                sender: 'agent',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, agentMessage]);
        }, 1000);
    };
    
    const openBuyModal = () => {
        setTradeType('buy');
        setTradeModalOpen(true);
    };
    
    const openSellModal = () => {
        setTradeType('sell');
        setTradeModalOpen(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Header */}
            <div className="bg-white border-b shadow-sm p-4">
                <div className="container mx-auto max-w-6xl flex items-center">
                    <button
                        onClick={() => navigate('/explore')}
                        className="text-gray-600 hover:text-indigo-600 mr-4 flex items-center"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                    <div className="flex items-center flex-1">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <Bot className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">{agent.name}</h1>
                            <p className="text-sm text-gray-500">{agent.role}</p>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Online
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Chat + Token Info */}
            <div className="flex-1 overflow-hidden p-4">
                <div className="container mx-auto max-w-6xl h-full flex flex-col md:flex-row gap-4">
                    {/* Chat Box - Left Side */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-indigo-600 text-white p-4">
                            <h2 className="font-medium">Conversation with {agent.name}</h2>
                        </div>
                        
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                        <Bot className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Start a conversation</h3>
                                    <p className="text-gray-500 max-w-md">
                                        Send a message to begin chatting with {agent.name}, your {agent.role.toLowerCase()}.
                                    </p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'agent' && (
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <Bot className="w-4 h-4 text-indigo-600" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[75%] rounded-2xl p-4 ${
                                                message.sender === 'user'
                                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-tl-none'
                                            }`}
                                        >
                                            <div>{message.content}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        {/* Input Form */}
                        <div className="border-t p-4 bg-white">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-5 py-3 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-md"
                                    disabled={!input.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    {/* Token Information - Right Side */}
                    <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4">
                        {/* Token Price Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">{agent.tokenName} Token</h3>
                                <span className="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-medium">
                                    {agent.tokenSymbol}
                                </span>
                            </div>
                            
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-bold text-gray-900">${tokenData.price}</span>
                                <span className={`text-sm font-medium flex items-center ${tokenData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {tokenData.priceChange >= 0 ? '+' : ''}{tokenData.priceChange}%
                                    {tokenData.priceChange >= 0 ? 
                                        <TrendingUp className="w-4 h-4 ml-1" /> : 
                                        <TrendingUp className="w-4 h-4 ml-1 transform rotate-180" />
                                    }
                                </span>
                            </div>
                            
                            {/* Simple Chart Visualization */}
                            <div className="h-16 w-full mb-4 flex items-end gap-1">
                                {tokenData.chartData.map((value, index) => (
                                    <div 
                                        key={index}
                                        className="bg-indigo-500 rounded-t-sm opacity-80"
                                        style={{ 
                                            height: `${value}%`,
                                            width: `${100 / tokenData.chartData.length - 1}%` 
                                        }}
                                    ></div>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <button 
                                    onClick={openBuyModal}
                                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1 font-medium"
                                >
                                    <ArrowDownCircle className="w-4 h-4" />
                                    Buy
                                </button>
                                <button 
                                    onClick={openSellModal}
                                    className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1 font-medium"
                                >
                                    <ArrowUpCircle className="w-4 h-4" />
                                    Sell
                                </button>
                            </div>
                        </div>
                        
                        {/* Wallet Balance Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center mb-4">
                                <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                                <h3 className="font-bold text-gray-800">Your Balance</h3>
                            </div>
                            
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">{tokenData.balance} {agent.tokenSymbol}</span>
                            </div>
                            
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Value:</span>
                                <span className="font-medium">${tokenData.value}</span>
                            </div>
                            
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Token Info</h4>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Total Supply:</span>
                                    <span>{Number(agent.tokenSupply).toLocaleString()} {agent.tokenSymbol}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Agent:</span>
                                    <span>{agent.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Trade Modal */}
            <TradeModal 
                isOpen={tradeModalOpen}
                onClose={() => setTradeModalOpen(false)}
                tradeType={tradeType}
                tokenSymbol={agent?.tokenSymbol || ''}
                tokenName={agent?.tokenName || ''}
                tokenPrice={tokenData.price}
            />
        </div>
    );
}

export default ChatPage;