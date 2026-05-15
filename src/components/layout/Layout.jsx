// src/components/layout/Layout.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
  <div className="min-h-screen bg-white">
      <Header />
      <div className="flex pt-16">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <motion.main 
          animate={{ 
            marginLeft: collapsed ? '5rem' : '18rem',
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;