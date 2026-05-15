// src/components/common/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ 
  size = 'md', 
  color = 'primary',
  text = '',
  fullScreen = false,
  overlay = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };
  
  const colorClasses = {
    primary: 'border-purple-500',
    white: 'border-white',
    gray: 'border-gray-400'
  };
  
  const loaderContent = (
    <div className={`flex flex-col items-center justify-center ${overlay ? 'absolute inset-0 bg-black/50 backdrop-blur-sm z-50' : ''}`}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full`}
      />
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-white/70"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }
  
  return loaderContent;
};

export default Loader;