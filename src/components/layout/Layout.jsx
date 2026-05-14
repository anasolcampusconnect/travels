import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  // Sidebar state ni ikkada maintain chesthunnam
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-200 to-stone-400">
      <Header />
      <div className="flex pt-16">
        {/* State ni props laaga Sidebar ki pass chesthunnam */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        
        {/* Ikkade magic jaruguthundi: collapsed unte ml-20 (80px), lekapothe ml-72 (288px) */}
        <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-72'
        }`}>
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;