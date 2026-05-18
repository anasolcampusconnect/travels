// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Settings, Bell, Lock, Palette, Globe, Database,
  Mail, Shield, Smartphone, CreditCard, User,
  Save, AlertCircle, CheckCircle, Moon, Sun,
  Monitor, Volume2, VolumeX, Tv, Wifi, WifiOff,
  RefreshCw, Trash2, Download, Upload, Key,
  Fingerprint, Eye, EyeOff, Zap, Gift, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/storageService';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '👤'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [preferences, setPreferences] = useState({
    theme: localStorage.getItem('theme') || 'light',
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    language: 'en',
    timezone: 'Asia/Kolkata'
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const sections = [
    { id: 'general', label: 'General', icon: Settings, description: 'Basic settings' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your profile' },
    { id: 'security', label: 'Security', icon: Lock, description: 'Password & security' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alert preferences' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme & display' },
    { id: 'integrations', label: 'Integrations', icon: Globe, description: 'Connected services' },
    { id: 'data', label: 'Data Management', icon: Database, description: 'Import/Export data' }
  ];

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setPreferences(prev => ({ ...prev, theme: savedTheme }));
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      // Save theme
      localStorage.setItem('theme', preferences.theme);
      document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
      
      // Save preferences
      storageService.set('user_preferences', preferences);
      
      setSaved(true);
      setLoading(false);
      toast.success('Settings saved successfully!');
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    setTimeout(() => {
      updateUser(profileData);
      storageService.set('user_profile', profileData);
      toast.success('Profile updated successfully!');
      setLoading(false);
    }, 800);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
    }, 800);
  };

  const handleExportData = () => {
    const data = {
      user: user,
      preferences: preferences,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parceltrack_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          toast.success('Data imported successfully!');
        } catch (error) {
          toast.error('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure? This will clear all local data.')) {
      localStorage.clear();
      toast.success('All data cleared!');
      window.location.reload();
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-3">
          <Settings className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-white/80 mt-1">Configure your application preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-20">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <motion.button
                  key={section.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <span className="font-medium">{section.label}</span>
                    <p className="text-xs opacity-70">{section.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <AnimatePresence mode="wait">
              {/* General Settings */}
              {activeSection === 'general' && (
                <motion.div
                  key="general"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    General Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                        placeholder="ParcelTrack" 
                        defaultValue="ParcelTrack"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Indian Rupee (₹)</option>
                        <option>US Dollar ($)</option>
                        <option>Euro (€)</option>
                        <option>British Pound (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Asia/Kolkata (IST)</option>
                        <option>America/New York (EST)</option>
                        <option>Europe/London (GMT)</option>
                        <option>Asia/Dubai (GST)</option>
                        <option>Australia/Sydney (AEDT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={preferences.language}
                        onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="kn">ಕನ್ನಡ (Kannada)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <motion.div
                  key="profile"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Profile Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl">
                        {profileData.avatar}
                      </div>
                      <button className="px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition">
                        Change Avatar
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                        value={profileData.email}
                        disabled
                      />
                      <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <button 
                      onClick={handleProfileUpdate}
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <motion.div
                  key="security"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    Security Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <button className="ml-auto px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm">Enable</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showCurrentPassword ? 'text' : 'password'} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        />
                        <button 
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-2.5 text-gray-400"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? 'text' : 'password'} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        />
                        <button 
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-2.5 text-gray-400"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                    </div>
                    <button 
                      onClick={handlePasswordChange}
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <motion.div
                  key="notifications"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    Notification Preferences
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive updates via email</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 transition relative"
                        checked={preferences.notifications.email}
                        onChange={(e) => setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, email: e.target.checked}
                        })}
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Push Notifications</p>
                          <p className="text-xs text-gray-500">Receive push notifications on mobile</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 transition relative"
                        checked={preferences.notifications.push}
                        onChange={(e) => setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, push: e.target.checked}
                        })}
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">SMS Alerts</p>
                          <p className="text-xs text-gray-500">Receive SMS for important updates</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        className="toggle w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 transition relative"
                        checked={preferences.notifications.sms}
                        onChange={(e) => setPreferences({
                          ...preferences, 
                          notifications: {...preferences.notifications, sms: e.target.checked}
                        })}
                      />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <motion.div
                  key="appearance"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    Appearance
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setPreferences({...preferences, theme: 'light'})}
                          className={`p-4 border-2 rounded-xl text-center transition-all ${
                            preferences.theme === 'light' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                          <p className="text-sm font-medium">Light</p>
                        </button>
                        <button
                          onClick={() => setPreferences({...preferences, theme: 'dark'})}
                          className={`p-4 border-2 rounded-xl text-center transition-all ${
                            preferences.theme === 'dark' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                          <p className="text-sm font-medium">Dark</p>
                        </button>
                        <button
                          onClick={() => setPreferences({...preferences, theme: 'system'})}
                          className={`p-4 border-2 rounded-xl text-center transition-all ${
                            preferences.theme === 'system' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <p className="text-sm font-medium">System</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations Settings */}
              {activeSection === 'integrations' && (
                <motion.div
                  key="integrations"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-600" />
                    Integrations
                  </h2>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Google Services</p>
                            <p className="text-xs text-gray-500">Sync with Google Calendar, Drive</p>
                          </div>
                        </div>
                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm">Connect</button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.23,0H1.77C0.79,0,0,0.79,0,1.77v20.46C0,23.21,0.79,24,1.77,24h20.46c0.98,0,1.77-0.79,1.77-1.77V1.77C24,0.79,23.21,0,22.23,0z M7.08,20.31H3.55V8.97h3.53V20.31z M5.31,7.42c-1.13,0-2.05-0.92-2.05-2.05s0.92-2.05,2.05-2.05s2.05,0.92,2.05,2.05S6.44,7.42,5.31,7.42z M20.31,20.31h-3.53v-5.63c0-1.34-0.48-2.26-1.68-2.26c-0.92,0-1.47,0.62-1.71,1.22c-0.09,0.22-0.11,0.52-0.11,0.83v5.84h-3.53V8.97h3.53v1.57c0.47-0.73,1.32-1.77,3.21-1.77c2.34,0,4.1,1.53,4.1,4.82V20.31z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">LinkedIn</p>
                            <p className="text-xs text-gray-500">Share achievements, connect network</p>
                          </div>
                        </div>
                        <button className="px-4 py-1.5 bg-gray-600 text-white rounded-lg text-sm">Connect</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Data Management */}
              {activeSection === 'data' && (
                <motion.div
                  key="data"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    Data Management
                  </h2>
                  <div className="space-y-3">
                    <button 
                      onClick={handleExportData}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Export Data</p>
                          <p className="text-xs text-gray-500">Download all your data as JSON</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button 
                      onClick={handleImportData}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">Import Data</p>
                          <p className="text-xs text-gray-500">Restore from backup file</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button 
                      onClick={handleClearData}
                      className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium text-red-800">Clear All Data</p>
                          <p className="text-xs text-red-500">Permanently delete all local data</p>
                        </div>
                      </div>
                      <span className="text-red-400">→</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save Button - Visible for all sections except profile, security */}
            {!['profile', 'security'].includes(activeSection) && (
              <div className="mt-8 pt-6 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : saved ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {loading ? 'Saving...' : saved ? 'Settings Saved!' : 'Save Changes'}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .toggle {
          position: relative;
          cursor: pointer;
        }
        .toggle:checked {
          background-color: #8b5cf6;
        }
        .toggle:before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          top: 1px;
          left: 2px;
          transition: transform 0.2s;
        }
        .toggle:checked:before {
          transform: translateX(18px);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;