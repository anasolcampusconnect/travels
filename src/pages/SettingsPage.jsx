import React, { useState } from 'react';
import { 
  Settings, Bell, Lock, Palette, Globe, Database,
  Mail, Shield, Smartphone, CreditCard, User,
  Save, AlertCircle, CheckCircle
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  
  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'data', label: 'Data Management', icon: Database }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black flex items-center gap-3">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-black/80 mt-1">Configure your application preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-20">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                    activeSection === section.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  General Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500" placeholder="ParcelTrack" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                    <select className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500">
                      <option>Indian Rupee (₹)</option>
                      <option>US Dollar ($)</option>
                      <option>Euro (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500">
                      <option>Asia/Kolkata (IST)</option>
                      <option>America/New York (EST)</option>
                      <option>Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Notification Preferences
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-800">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive push notifications on mobile</p>
                      </div>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-800">SMS Alerts</p>
                        <p className="text-xs text-gray-500">Receive SMS for important updates</p>
                      </div>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Settings Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;