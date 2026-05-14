import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/import', label: 'Import', icon: '📥' },
    { path: '/export', label: 'Export', icon: '📤' },
    { path: '/history', label: 'History', icon: '📜' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];
  
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ImportExport Pro
          </span>
        </Link>
        
        <button 
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        
        <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-white md:bg-transparent flex-col md:flex-row gap-2 p-4 md:p-0 shadow-md md:shadow-none`}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${location.pathname === item.path 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span>{item.icon}</span>
                  <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <span className="text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;