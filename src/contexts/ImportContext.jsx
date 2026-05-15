// src/contexts/ImportContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const ImportContext = createContext();

const initialState = {
  currentImport: null,
  importHistory: [],
  file: null,
  previewData: null,
  status: 'idle',
  progress: 0
};

function importReducer(state, action) {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload };
    case 'SET_PREVIEW':
      return { ...state, previewData: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, importHistory: [action.payload, ...state.importHistory].slice(0, 50) };
    default:
      return state;
  }
}

export const ImportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(importReducer, initialState);

  return (
    <ImportContext.Provider value={{ state, dispatch }}>
      {children}
    </ImportContext.Provider>
  );
};

export const useImport = () => {
  const context = useContext(ImportContext);
  if (!context) {
    throw new Error('useImport must be used within ImportProvider');
  }
  return context;
};