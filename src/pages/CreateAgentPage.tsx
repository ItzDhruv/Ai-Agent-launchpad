import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Brain, Command, Cpu, MessageSquare, Rocket, Send, Search, ArrowRight } from 'lucide-react';
import Navigation from "../component/Navigation";


interface Agent {
    id: string;
    name: string;
    provider: string;
    model: string;
    role: string;
    instructions: string;
    tokenName: string;
    tokenSymbol: string;
    tokenSupply: string;
  }

function CreateAgentPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      name: '',
      provider: '',
      model: '',
      role: '',
      instructions: '',
      tokenName: '',
      tokenSymbol: '',
      tokenSupply: ''
    });
  
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
  
    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.provider) {
        newErrors.provider = 'Please select a provider';
      }
      
      if (!formData.model) {
        newErrors.model = 'Please select a model';
      }
      
      if (!formData.role.trim()) {
        newErrors.role = 'Role is required';
      }
      
      if (!formData.instructions.trim()) {
        newErrors.instructions = 'Instructions are required';
      }

      if (!formData.tokenName.trim()) {
        newErrors.tokenName = 'Token name is required';
      }

      if (!formData.tokenSymbol.trim()) {
        newErrors.tokenSymbol = 'Token symbol is required';
      }

      if (!formData.tokenSupply.trim()) {
        newErrors.tokenSupply = 'Token supply is required';
      } else if (isNaN(Number(formData.tokenSupply)) || Number(formData.tokenSupply) <= 0) {
        newErrors.tokenSupply = 'Token supply must be a positive number';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      if (validateForm()) {
        const newAgent: Agent = {
          ...formData,
          id: Date.now().toString(),
        };
  
        // Save to localStorage
        const agents = JSON.parse(localStorage.getItem('agents') || '[]');
        localStorage.setItem('agents', JSON.stringify([...agents, newAgent]));
  
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setIsSubmitting(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-center mb-8">
                <Bot className="w-12 h-12 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Agent</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Agent name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Instructions
                  </label>
                  <textarea
                    name="instructions"
                    id="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    placeholder="Provide detailed instructions for your agent..."
                  />
                  {errors.instructions && (
                    <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
                  )}
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                      LLM Provider
                    </label>
                    <select
                      name="provider"
                      id="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.provider ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    >
                      <option value="">Select Provider</option>
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="google">Google AI</option>
                    </select>
                    {errors.provider && (
                      <p className="mt-1 text-sm text-red-600">{errors.provider}</p>
                    )}
                  </div>
  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                      LLM Model
                    </label>
                    <select
                      name="model"
                      id="model"
                      value={formData.model}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.model ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    >
                      <option value="">Select a Provider First</option>
                      {formData.provider === 'openai' && (
                        <>
                          <option value="gpt-4">GPT-4</option>
                          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        </>
                      )}
                      {formData.provider === 'anthropic' && (
                        <>
                          <option value="claude-2">Claude 2</option>
                          <option value="claude-instant">Claude Instant</option>
                        </>
                      )}
                      {formData.provider === 'google' && (
                        <>
                          <option value="gemini-pro">Gemini Pro</option>
                          <option value="gemini-ultra">Gemini Ultra</option>
                        </>
                      )}
                    </select>
                    {errors.model && (
                      <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                    )}
                  </div>
                </div>
  
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="e.g. Customer Support Assistant"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>

                {/* Token Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="tokenName" className="block text-sm font-medium text-gray-700 mb-2">
                      Token Name
                    </label>
                    <input
                      type="text"
                      name="tokenName"
                      id="tokenName"
                      placeholder="e.g. MyAgentCoin"
                      value={formData.tokenName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.tokenName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    />
                    {errors.tokenName && (
                      <p className="mt-1 text-sm text-red-600">{errors.tokenName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tokenSymbol" className="block text-sm font-medium text-gray-700 mb-2">
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      name="tokenSymbol"
                      id="tokenSymbol"
                      placeholder="e.g. MAC"
                      value={formData.tokenSymbol}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.tokenSymbol ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    />
                    {errors.tokenSymbol && (
                      <p className="mt-1 text-sm text-red-600">{errors.tokenSymbol}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tokenSupply" className="block text-sm font-medium text-gray-700 mb-2">
                      Token Supply
                    </label>
                    <input
                      type="text"
                      name="tokenSupply"
                      id="tokenSupply"
                      placeholder="e.g. 1000000"
                      value={formData.tokenSupply}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.tokenSupply ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                    />
                    {errors.tokenSupply && (
                      <p className="mt-1 text-sm text-red-600">{errors.tokenSupply}</p>
                    )}
                  </div>
                </div>
  
               
  
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Agent'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default CreateAgentPage;