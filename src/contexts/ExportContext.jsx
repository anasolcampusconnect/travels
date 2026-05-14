import React, { createContext, useContext, useReducer } from 'react';
import { EXPORT_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const ExportContext = createContext();

const initialState = {
  currentExport: null,
  exportHistory: [],
  format: 'csv',
  selectedFields: [],
  filters: {},
  dataSource: null,
  status: EXPORT_STATUS.IDLE,
  progress: 0,
  config: {
    delimiter: ',',
    encoding: 'UTF-8',
    includeHeaders: true,
    pretty: true
  }
};

function exportReducer(state, action) {
  switch (action.type) {
    case 'SET_FORMAT':
      return { ...state, format: action.payload };
    
    case 'SET_SELECTED_FIELDS':
      return { ...state, selectedFields: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };
    
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    
    case 'SET_DATA_SOURCE':
      return { ...state, dataSource: action.payload };
    
    case 'ADD_TO_HISTORY':
      const exportRecord = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      return { ...state, exportHistory: [exportRecord, ...state.exportHistory].slice(0, 50) };
    
    case 'RESET_EXPORT':
      return {
        ...initialState,
        exportHistory: state.exportHistory
      };
    
    default:
      return state;
  }
}

export function ExportProvider({ children }) {
  const [state, dispatch] = useReducer(exportReducer, initialState);

  const startExport = async (config) => {
    dispatch({ type: 'SET_STATUS', payload: EXPORT_STATUS.PREPARING });
    // Implementation will be in services
  };

  return (
    <ExportContext.Provider value={{ state, dispatch, startExport }}>
      {children}
    </ExportContext.Provider>
  );
}

export function useExport() {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useExport must be used within ExportProvider');
  }
  return context;
}