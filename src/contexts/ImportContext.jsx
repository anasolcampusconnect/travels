import React, { createContext, useContext, useReducer } from 'react';
import { IMPORT_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const ImportContext = createContext();

const initialState = {
  currentImport: null,
  importHistory: [],
  file: null,
  previewData: null,
  validationErrors: [],
  columnMapping: {},
  status: IMPORT_STATUS.IDLE,
  progress: 0
};

function importReducer(state, action) {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload, status: IMPORT_STATUS.PENDING };
    
    case 'SET_PREVIEW':
      return { ...state, previewData: action.payload };
    
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload, status: IMPORT_STATUS.VALIDATING };
    
    case 'SET_COLUMN_MAPPING':
      return { ...state, columnMapping: action.payload };
    
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    
    case 'ADD_TO_HISTORY':
      const importRecord = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      return { ...state, importHistory: [importRecord, ...state.importHistory].slice(0, 50) };
    
    case 'RESET_IMPORT':
      return {
        ...initialState,
        importHistory: state.importHistory
      };
    
    default:
      return state;
  }
}

export function ImportProvider({ children }) {
  const [state, dispatch] = useReducer(importReducer, initialState);

  const startImport = async (file, config) => {
    dispatch({ type: 'SET_STATUS', payload: IMPORT_STATUS.PROCESSING });
    // Implementation will be in services
  };

  return (
    <ImportContext.Provider value={{ state, dispatch, startImport }}>
      {children}
    </ImportContext.Provider>
  );
}

export function useImport() {
  const context = useContext(ImportContext);
  if (!context) {
    throw new Error('useImport must be used within ImportProvider');
  }
  return context;
}