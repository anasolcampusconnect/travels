import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isAdmin as checkIsAdmin } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(!!currentUser);
    setIsAdmin(currentUser?.role === 'admin');
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    
    // Listen for storage changes (logout from other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'parceltrack_current_user') {
        loadUser();
      }
    });
    
    return () => {
      window.removeEventListener('storage', loadUser);
    };
  }, []);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    setIsAuthenticated(!!newUser);
    setIsAdmin(newUser?.role === 'admin');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};