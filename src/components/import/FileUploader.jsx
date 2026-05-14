import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../common/Button';
import { formatFileSize } from '../../utils/helpers';

const FileUploader = ({ onUploadComplete, acceptedTypes = null }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
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
    try {
      await onUploadComplete(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (!file) {
    return (
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-200 bg-gray-50
          ${isDragActive ? 'border-purple-500 bg-purple-50 scale-95' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-100'}
        `}
      >
        <input {...getInputProps()} />
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Drag & drop your file here</h3>
        <p className="text-gray-500 mb-4">or click to browse</p>
        <div className="flex gap-2 justify-center flex-wrap mb-3">
          {acceptedFileTypes.map(type => (
            <span key={type} className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">{type}</span>
          ))}
        </div>
        <small className="text-gray-400">Maximum file size: 10MB</small>
      </div>
    );
  }
  
  return (
    <div className="p-6 border rounded-xl bg-gray-50">
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
        <span className="text-4xl">📄</span>
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{file.name}</div>
          <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
        </div>
        <button onClick={() => setFile(null)} className="text-2xl text-gray-400 hover:text-red-500">✕</button>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
      
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={() => setFile(null)}>Change File</Button>
        <Button variant="primary" onClick={handleUpload} loading={isUploading} disabled={!file}>
          Upload & Preview
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;