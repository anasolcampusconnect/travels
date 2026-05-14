import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

const AppContext = createContext();

const initialState = {
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  language: localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en',
  userPreferences: {},
  notifications: [],
  isLoading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
      return { ...state, theme: action.payload };
    
    case 'SET_LANGUAGE':
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, action.payload);
      return { ...state, language: action.payload };
    
    case 'SET_PREFERENCES':
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(action.payload));
      return { ...state, userPreferences: action.payload };
    
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedPrefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (savedPrefs) {
      dispatch({ type: 'SET_PREFERENCES', payload: JSON.parse(savedPrefs) });
    }
  }, []);

  const addNotification = (notification) => {
    const id = Date.now();
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id, ...notification } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, 5000);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addNotification }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}