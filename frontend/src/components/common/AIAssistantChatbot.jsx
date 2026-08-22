import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronDown, RefreshCw, User } from 'lucide-react';
import { chatWithAIAssistant } from '../../services/api';

export const AIAssistantChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am the Renovia Talent AI Assistant. How can I help you today with our software engineering services, AI solutions, or tech talent recruitment?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'What services do you offer?',
    'How do I apply for jobs?',
    'Do you build AI solutions?',
    'How do I get a consultation quote?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatWithAIAssistant(query, messages);
      const aiMsg = {
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I am currently processing high volume. Please contact our team directly via the Contact page or WhatsApp for immediate assistance!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-50 flex flex-col items-start pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[90vw] sm:w-[380px] h-[520px] max-h-[80vh] rounded-3xl bg-[#080B14] border border-blue-500/40 shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-[#0B101D] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Renovia AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-blue-400">Technology & Talent Advisor</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[82%] ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                      : 'bg-[#101621] border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1.5">{m.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-blue-400 p-2">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>AI is analyzing & formulating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#05070D] border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 rounded-lg bg-[#101621] border border-slate-800 text-[11px] text-slate-300 hover:text-blue-300 hover:border-blue-500/40 transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0B101D] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Renovia Talent..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-105 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-blue-500/40"
        aria-label="Toggle AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05070D]" />
        </div>
        <span className="text-xs sm:text-sm font-semibold tracking-wide hidden sm:inline">
          AI Assistant
        </span>
      </button>

    </div>
  );
};

export default AIAssistantChatbot;
