// src/components/common/Input.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  helperText = '',
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-purple-200 mb-1">
          {label}
          {required && <span className="text-pink-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value, e)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-2.5 bg-white/5 rounded-xl outline-none transition-all duration-200
            ${error 
              ? 'border border-red-500/50 focus:ring-2 focus:ring-red-500/30' 
              : `border ${isFocused ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-white/20'}`
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            text-white placeholder-white/30
          `}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {helperText && !error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-purple-200/60"
        >
          {helperText}
        </motion.p>
      )}
      
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-xs text-red-300 flex items-center gap-1"
          >
            <span>⚠️</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;