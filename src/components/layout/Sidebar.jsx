import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/import', icon: '📥', label: 'Import' },
    { path: '/export', icon: '📤', label: 'Export' },
    { path: '/history', icon: '📜', label: 'History' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;