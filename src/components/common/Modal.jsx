import React, { useEffect } from 'react';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  actions = []
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95%] h-[95vh]'
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className={`bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh] ${sizes[size]} w-full mx-4 animate-slideUp`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showCloseButton && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ✕
            </button>
          )}
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
        
        {actions.length > 0 && (
          <div className="flex justify-end gap-2 p-4 border-t">
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;