// src/components/common/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  title = null,
  subtitle = null,
  icon = null,
  actions = null,
  hoverable = false,
  bordered = true,
  padding = 'md',
  className = '',
  onClick = null
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const cardContent = (
    <>
      {(title || subtitle || icon || actions) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {icon && <div className="text-2xl">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-xs text-purple-200/70 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="text-white/80">
        {children}
      </div>
    </>
  );
  
  const cardClassName = `
    bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300
    ${bordered ? 'border border-white/20' : ''}
    ${hoverable ? 'hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;
  
  if (hoverable) {
    return (
      <motion.div 
        whileHover={{ y: -4 }}
        className={cardClassName}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <div className={cardClassName} onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card;