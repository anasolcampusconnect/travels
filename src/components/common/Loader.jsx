import React from 'react';
import './Loader.css';

const Loader = ({ 
  size = 'md', 
  color = 'primary',
  text = '',
  fullScreen = false,
  overlay = false
}) => {
  const sizeClasses = {
    sm: 'loader-sm',
    md: 'loader-md',
    lg: 'loader-lg'
  };
  
  const colorClasses = {
    primary: 'loader-primary',
    white: 'loader-white',
    gray: 'loader-gray'
  };
  
  const loader = (
    <div className={`loader-container ${overlay ? 'loader-overlay' : ''}`}>
      <div className={`loader ${sizeClasses[size]} ${colorClasses[color]}`}>
        <div className="loader-spinner"></div>
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
  
  if (fullScreen) {
    return <div className="loader-fullscreen">{loader}</div>;
  }
  
  return loader;
};

// Loader.css
const loaderStyles = `
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  z-index: 10;
}

.loader-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  text-align: center;
}

.loader-spinner {
  display: inline-block;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loader-sm .loader-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e5e7eb;
  border-top-color: currentColor;
}

.loader-md .loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: currentColor;
}

.loader-lg .loader-spinner {
  width: 56px;
  height: 56px;
  border: 5px solid #e5e7eb;
  border-top-color: currentColor;
}

.loader-primary {
  color: #667eea;
}

.loader-white {
  color: white;
}

.loader-gray {
  color: #9ca3af;
}

.loader-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

export default Loader;