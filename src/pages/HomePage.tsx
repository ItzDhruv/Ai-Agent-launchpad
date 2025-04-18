import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Bot, Brain, Command, Cpu, MessageSquare, Rocket, Send, Search, ArrowRight } from 'lucide-react';
import Navigation from '../component/Navigation';
import FeatureCard from '../component/FeatureCard';


function HomePage() {
    const navigate = useNavigate();
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-8">
            <Rocket className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-[1.4] bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
    AI Agent Launchpad
  </h1>
  
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Deploy and manage decentrlized intelligent AI agents that work for you. Streamline your workflow with automated assistance.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/create')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Launch Your Agent
            </button>
            <button 
              onClick={() => navigate('/explore')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              Explore Agents
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </header>
  
        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Advanced Intelligence"
              description="Powered by state-of-the-art machine learning models for human-like interactions"
            />
            <FeatureCard
              icon={Command}
              title="Custom Commands"
              description="Create and customize commands to automate your specific workflows"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Natural Conversations"
              description="Engage in fluid, context-aware conversations with your AI agent"
            />
            <FeatureCard
              icon={Bot}
              title="24/7 Availability"
              description="Your AI agent is always ready to assist, whenever you need it"
            />
            <FeatureCard
              icon={Cpu}
              title="Resource Efficient"
              description="Optimized performance with minimal computational overhead"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Multi-task Support"
              description="Handle multiple tasks simultaneously with ease and precision"
            />
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="bg-indigo-600 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from AI-powered assistance.
            </p>
            <button 
              onClick={() => navigate('/create')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get Started Now
            </button>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2025 AI Agent Launchpad. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  export default HomePage;