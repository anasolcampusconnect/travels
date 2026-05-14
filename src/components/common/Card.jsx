import React from 'react';

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
  
  return (
    <div 
      className={`
        bg-white rounded-xl overflow-hidden transition-all duration-200
        ${bordered ? 'border border-gray-200' : ''}
        ${hoverable ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle || icon || actions) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {icon && <div className="text-2xl">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Card;