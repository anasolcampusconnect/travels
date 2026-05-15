// src/components/import/FileUploader.jsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const FileUploader = ({ onUploadComplete, acceptedTypes = null }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const acceptedFileTypes = acceptedTypes || ['.csv', '.json', '.xlsx', '.xls'];
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(rejectedFiles[0].errors[0].message);
      return;
    }
    setFile(acceptedFiles[0]);
    setError(null);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, ext) => ({ ...acc, [ext]: [] }), {}),
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });
  
  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      await onUploadComplete(file);
      setUploadProgress(100);
      setTimeout(() => clearInterval(interval), 500);
    } catch (err) {
      setError(err.message);
      clearInterval(interval);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
      }, 500);
    }
  };
  
  if (!file) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-200 bg-white/5
          ${isDragActive ? 'border-purple-500 bg-purple-500/10 scale-95' : 'border-white/30 hover:border-purple-500/50 hover:bg-white/10'}
        `}
      >
        <input {...getInputProps()} />
        <motion.div 
          animate={{ y: isDragActive ? -5 : 0 }}
          className="text-6xl mb-4"
        >
          📁
        </motion.div>
        <h3 className="text-lg font-semibold text-white mb-2">Drag & drop your file here</h3>
        <p className="text-white/60 mb-4">or click to browse</p>
        <div className="flex gap-2 justify-center flex-wrap mb-3">
          {acceptedFileTypes.map(type => (
            <span key={type} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">{type}</span>
          ))}
        </div>
        <small className="text-white/40">Maximum file size: 10MB</small>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border border-white/20 rounded-xl bg-white/5"
    >
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="text-4xl"
        >
          📄
        </motion.div>
        <div className="flex-1">
          <div className="font-semibold text-white">{file.name}</div>
          <div className="text-sm text-white/50">{(file.size / 1024).toFixed(2)} KB</div>
          {isUploading && (
            <div className="mt-2">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <p className="text-xs text-white/50 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFile(null)} 
          className="p-2 text-white/50 hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" /> {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={() => setFile(null)}>Change File</Button>
        <Button variant="primary" onClick={handleUpload} loading={isUploading} disabled={!file}>
          Upload & Preview
        </Button>
      </div>
    </motion.div>
  );
};

export default FileUploader;