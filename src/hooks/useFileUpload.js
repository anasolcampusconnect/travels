import { useState, useCallback } from 'react';
import fileParserService from '../services/fileParser';
import { STATUS } from '../utils/constants';

export const useFileUpload = (options = {}) => {
  const {
    allowedTypes = ['.csv', '.json', '.xlsx'],
    maxSize = 10 * 1024 * 1024,
    onSuccess = null,
    onError = null
  } = options;
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const validateFile = useCallback(async (file) => {
    const validation = await fileParserService.validateFile(file, allowedTypes);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
    }
    
    return true;
  }, [allowedTypes, maxSize]);
  
  const uploadFile = useCallback(async (file) => {
    setStatus(STATUS.LOADING);
    setError(null);
    setProgress(0);
    
    try {
      await validateFile(file);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);
      
      const fileType = fileParserService.getFileType(file.name);
      const parsedData = await fileParserService.parseFile(file, fileType);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setFile(file);
      setPreview(parsedData);
      setStatus(STATUS.SUCCESS);
      
      if (onSuccess) {
        onSuccess(parsedData);
      }
      
      return parsedData;
    } catch (err) {
      setError(err.message);
      setStatus(STATUS.ERROR);
      if (onError) {
        onError(err);
      }
      throw err;
    }
  }, [validateFile, onSuccess, onError]);
  
  const resetUpload = useCallback(() => {
    setFile(null);
    setPreview(null);
    setStatus(STATUS.IDLE);
    setError(null);
    setProgress(0);
  }, []);
  
  const getPreview = useCallback(async (file, rows = 5) => {
    try {
      const previewData = await fileParserService.getFilePreview(file, rows);
      return previewData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);
  
  return {
    file,
    preview,
    status,
    error,
    progress,
    uploadFile,
    resetUpload,
    getPreview,
    isLoading: status === STATUS.LOADING,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR
  };
};