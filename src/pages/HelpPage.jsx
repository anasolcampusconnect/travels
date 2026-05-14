import React, { useState } from 'react';
import { 
  HelpCircle, Search, Mail, Phone, MessageCircle,
  BookOpen, Video, Users, ChevronRight, Star,
  LifeBuoy, FileText, ExternalLink, Clock
} from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    { question: 'How to track my parcel?', answer: 'Enter your tracking ID on the Track Parcel page...', category: 'Tracking' },
    { question: 'How to create a new parcel?', answer: 'Go to Create Parcel page and fill the form...', category: 'Booking' },
    { question: 'What are the supported payment methods?', answer: 'UPI, Credit/Debit cards, Net Banking...', category: 'Payments' },
    { question: 'How to contact customer support?', answer: 'Call us at 1800-123-4567 or email support@parceltrack.com', category: 'Support' }
  ];

  const categories = [
    { icon: BookOpen, label: 'Getting Started', count: 12, color: 'from-blue-500 to-cyan-500' },
    { icon: Video, label: 'Video Tutorials', count: 8, color: 'from-green-500 to-emerald-500' },
    { icon: FileText, label: 'Documentation', count: 24, color: 'from-purple-500 to-pink-500' },
    { icon: Users, label: 'Community', count: 156, color: 'from-orange-500 to-red-500' }
  ];

  const supportChannels = [
    { icon: Mail, label: 'Email Support', value: 'support@parceltrack.com', action: 'Send Email', color: 'bg-blue-100 text-blue-600' },
    { icon: Phone, label: 'Phone Support', value: '+91 1800-123-4567', action: 'Call Now', color: 'bg-green-100 text-green-600' },
    { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', action: 'Start Chat', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="w-8 h-8" />
          Help Center
        </h1>
        <p className="text-white/80 mt-1">Find answers, get support, and learn more</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, guides, and FAQs..."
            className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group cursor-pointer">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{cat.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count} articles</p>
            </div>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-purple-600" />
            Frequently Asked Questions
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{faq.category}</span>
                    <h4 className="font-medium text-gray-800">{faq.question}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t bg-gray-50">
          <button className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
            View All FAQs <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Support Channels */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            Contact Support
          </h3>
          <p className="text-sm text-gray-500 mt-1">Get in touch with our support team</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {supportChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div key={idx} className="p-6 text-center hover:bg-gray-50 transition-colors">
                <div className={`w-14 h-14 rounded-xl ${channel.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-semibold text-gray-800">{channel.label}</h4>
                <p className="text-sm text-gray-600 mt-1">{channel.value}</p>
                <button className="mt-3 text-sm text-purple-600 font-medium hover:text-purple-700">
                  {channel.action} →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Clock className="w-10 h-10" />
            <div>
              <h4 className="text-lg font-semibold">Response Time</h4>
              <p className="text-white/80">We typically respond within 24 hours</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;