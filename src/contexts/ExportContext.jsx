// src/contexts/ExportContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const ExportContext = createContext();

const initialState = {
  currentExport: null,
  exportHistory: [],
  format: 'csv',
  selectedFields: [],
  status: 'idle',
  progress: 0
};

function exportReducer(state, action) {
  switch (action.type) {
    case 'SET_FORMAT':
      return { ...state, format: action.payload };
    case 'SET_SELECTED_FIELDS':
      return { ...state, selectedFields: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, exportHistory: [action.payload, ...state.exportHistory].slice(0, 50) };
    default:
      return state;
  }
}

export const ExportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exportReducer, initialState);

  return (
    <ExportContext.Provider value={{ state, dispatch }}>
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = () => {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useExport must be used within ExportProvider');
  }
  return context;
};