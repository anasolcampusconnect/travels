// src/components/common/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  onClick,
  type = 'button',
  className = ''
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/25',
    danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-lg hover:shadow-red-500/25',
    outline: 'border border-white/30 text-white hover:bg-white/10',
    ghost: 'text-white/70 hover:text-white hover:bg-white/10'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-200 cursor-pointer disabled:opacity-50 
        disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''} ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      {icon && !loading && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;