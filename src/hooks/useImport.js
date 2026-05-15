// src/hooks/useImport.js
import { useState } from 'react';

export const useImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const startImport = async (file, options = {}) => {
    setIsImporting(true);
    setProgress(0);
    
    // Simulate import progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setIsImporting(false);
    return { success: true, rows: 100 };
  };

  return { isImporting, progress, startImport };
};