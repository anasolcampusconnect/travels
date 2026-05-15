// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, User, Bell, ChevronDown, LogOut, HelpCircle, Settings, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';
import logo from "../../assets/icons/export.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, logout: updateAuth } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    logout();
    updateAuth();
    navigate('/login');
  };
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Original Color - No Gradient Background */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* Removed the gradient overlay background */}
              <div className="relative w-[90px] h-[90px] flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="ParcelTrack Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                ParcelTrack
              </span>
              {/* <span className="text-xs text-gray-500 block leading-tight">Express Shipping</span> */}
            </div>
          </Link>
          
          {/* Right Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center"
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>
            
            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  {user?.avatar || <User className="w-4 h-4 text-white" />}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                    {user?.name || 'Guest'}
                    {isAdmin && (
                      <span className="ml-1 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Admin</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                            {user?.avatar || <User className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                              {user?.name || 'Guest'}
                              {isAdmin && (
                                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Admin</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <motion.button 
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/dashboard');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4" /> My Dashboard
                        </motion.button>
                        {isAdmin && (
                          <motion.button 
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              setShowUserMenu(false);
                              navigate('/admin');
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4" /> Admin Panel
                          </motion.button>
                        )}
                        <motion.button 
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/settings');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" /> Account Settings
                        </motion.button>
                        <motion.button 
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate('/help');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <HelpCircle className="w-4 h-4" /> Help Center
                        </motion.button>
                      </div>
                      <div className="border-t pt-2">
                        <motion.button 
                          whileHover={{ x: 5 }}
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 border-t space-y-2">
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" /> Dashboard
                </motion.button>
                {isAdmin && (
                  <motion.button 
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/admin');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
                  >
                    <Shield className="w-5 h-5" /> Admin Panel
                  </motion.button>
                )}
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" /> Settings
                </motion.button>
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/help');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  <HelpCircle className="w-5 h-5" /> Help
                </motion.button>
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    {user?.avatar || <User className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-1">
                      {user?.name || 'Guest'}
                      {isAdmin && <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">Admin</span>}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;