// src/pages/CustomerChatPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Send, User, Phone, Mail, Clock, 
  CheckCircle, X, Minus, MessageSquare, HelpCircle, 
  Package, Truck, MapPin, Calendar, DollarSign, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerChatPage = ({ onClose, parcel, isModal = false }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  
  // Pre-questions for customers
  const quickQuestions = [
    { id: 1, text: "Where is my parcel?", category: "tracking", icon: MapPin },
    { id: 2, text: "When will my parcel be delivered?", category: "delivery", icon: Calendar },
    { id: 3, text: "How much is the delivery charge?", category: "pricing", icon: DollarSign },
    { id: 4, text: "Can I change delivery address?", category: "modification", icon: MapPin },
    { id: 5, text: "How to track my parcel?", category: "tracking", icon: Package },
    { id: 6, text: "What is the refund policy?", category: "refund", icon: DollarSign },
    { id: 7, text: "Contact customer support", category: "support", icon: Phone },
    { id: 8, text: "Rate our service", category: "feedback", icon: Star }
  ];

  // Auto responses for different questions
  const getAutoResponse = (question, parcelInfo) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("where") && lowerQuestion.includes("parcel")) {
      return {
        text: `Your parcel ${parcelInfo?.id || 'TRK-XXXX'} is currently ${parcelInfo?.status === 'delivered' ? 'delivered' : 'in transit'}. ${parcelInfo?.status === 'delivered' ? `It was delivered to ${parcelInfo?.to} on ${parcelInfo?.date}` : `It is moving from ${parcelInfo?.from} to ${parcelInfo?.to}`}. You can track it in real-time.`,
        icon: MapPin
      };
    }
    
    if (lowerQuestion.includes("when") && (lowerQuestion.includes("deliver") || lowerQuestion.includes("reach"))) {
      return {
        text: `Your parcel ${parcelInfo?.id || 'TRK-XXXX'} is expected to be delivered within 2-3 business days. You will receive an SMS/Email confirmation once it's out for delivery.`,
        icon: Calendar
      };
    }
    
    if (lowerQuestion.includes("charge") || lowerQuestion.includes("price") || lowerQuestion.includes("cost")) {
      return {
        text: `Delivery charges vary based on distance and weight. For your parcel from ${parcelInfo?.from || 'source'} to ${parcelInfo?.to || 'destination'}, the estimated charge is ${parcelInfo?.amount || '₹500'}. Exact amount will be calculated at booking.`,
        icon: DollarSign
      };
    }
    
    if (lowerQuestion.includes("change address")) {
      return {
        text: "Yes, you can change delivery address within 2 hours of booking. Please contact our support team at +91 1800-123-4567 or visit your nearest branch with tracking ID.",
        icon: MapPin
      };
    }
    
    if (lowerQuestion.includes("track")) {
      return {
        text: `You can track your parcel ${parcelInfo?.id || 'TRK-XXXX'} by:\n1. Using our Track Parcel page\n2. Entering your tracking ID\n3. Clicking 'Track' button\nYou'll see real-time status updates.`,
        icon: Package
      };
    }
    
    if (lowerQuestion.includes("refund")) {
      return {
        text: "Refund policy: Full refund if parcel is not delivered within 7 days. Partial refund for damaged items (subject to inspection). Please file a complaint within 48 hours of delivery.",
        icon: DollarSign
      };
    }
    
    if (lowerQuestion.includes("contact") || lowerQuestion.includes("support")) {
      return {
        text: "Our customer support team is available 24/7.\n📞 Phone: +91 1800-123-4567\n📧 Email: support@parceltrack.com\n💬 Live Chat: Available on website",
        icon: Phone
      };
    }
    
    if (lowerQuestion.includes("rate") || lowerQuestion.includes("feedback")) {
      return {
        text: "Thank you for your feedback! Please rate your experience on a scale of 1-5. Your feedback helps us serve you better. ⭐⭐⭐⭐⭐",
        icon: Star
      };
    }
    
    return null;
  };

  // Initialize chat with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hello! 👋 I'm your virtual assistant. How can I help you with your parcel ${parcel?.id || ''}?`,
        sender: 'support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAuto: true
      }
    ]);
  }, [parcel]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setShowQuickQuestions(false);
    
    // Get auto response
    setTimeout(() => {
      const autoResponse = getAutoResponse(text, parcel);
      
      if (autoResponse) {
        const supportMessage = {
          id: messages.length + 2,
          text: autoResponse.text,
          sender: 'support',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: autoResponse.icon,
          isAuto: true
        };
        setMessages(prev => [...prev, supportMessage]);
      } else {
        // Default response for unknown questions
        const defaultMessage = {
          id: messages.length + 2,
          text: "Thank you for your message. Our support team will get back to you shortly. For immediate assistance, please call us at +91 1800-123-4567.",
          sender: 'support',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAuto: true
        };
        setMessages(prev => [...prev, defaultMessage]);
      }
    }, 500);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question.text);
  };

  const handleSend = () => {
    handleSendMessage(newMessage);
  };

  if (isModal) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Customer Support</h3>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-white/80 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-1 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.sender === 'customer' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} rounded-2xl px-3 py-2 shadow-sm`}>
                      {msg.icon && (
                        <div className="mb-1">
                          <msg.icon className="w-4 h-4 inline mr-1" />
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'customer' ? 'text-purple-200' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Questions */}
              {showQuickQuestions && (
                <div className="p-3 border-t bg-white">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Quick Questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, 4).map((q) => {
                      const Icon = q.icon;
                      return (
                        <button
                          key={q.id}
                          onClick={() => handleQuickQuestion(q)}
                          className="px-2 py-1 bg-gray-100 hover:bg-purple-100 rounded-lg text-xs text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1"
                        >
                          <Icon className="w-3 h-3" />
                          {q.text.length > 25 ? q.text.substring(0, 25) + '...' : q.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Input Area */}
              <div className="p-3 border-t flex gap-2 bg-white">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Full page version (original)
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
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'customer' ? 'text-purple-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Questions for full page */}
          {showQuickQuestions && (
            <div className="p-3 border-t bg-gray-50">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Quick Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q)}
                      className="px-3 py-1.5 bg-white hover:bg-purple-100 rounded-lg text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1 border border-gray-200"
                    >
                      <Icon className="w-3 h-3" />
                      {q.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
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