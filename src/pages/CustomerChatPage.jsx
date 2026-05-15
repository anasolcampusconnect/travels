// src/pages/CustomerChatPage.jsx
import React, { useState } from 'react';
import { MessageCircle, Send, User, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const CustomerChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'support', time: '10:00 AM' },
    { id: 2, text: 'I want to track my parcel TRK-987654321', sender: 'customer', time: '10:02 AM' },
    { id: 3, text: 'Let me check that for you...', sender: 'support', time: '10:03 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1,
      text: newMessage,
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
    
    // Auto response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Thank you for your message. Our support team will get back to you shortly.',
        sender: 'support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };
  
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customer Support</h1>
          <p className="text-gray-500">Chat with our support team</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Support Team</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Online
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" /> +91 1800-123-4567
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" /> support@parceltrack.com
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" /> 24/7 Support
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-800">Live Chat</h3>
            <p className="text-xs text-gray-500">Typically responds within a few minutes</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-xl ${msg.sender === 'customer' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'customer' ? 'text-purple-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500"
            />
            <button onClick={handleSend} className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChatPage;