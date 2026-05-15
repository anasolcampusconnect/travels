// src/components/import/ImportSummary.jsx
import React from 'react';
import Button from '../common/Button';
import { CheckCircle, FileText, Database, Clock } from 'lucide-react';

const ImportSummary = ({ fileData, columnMapping, onConfirm, onBack, isImporting }) => {
  const mappedCount = Object.keys(columnMapping).filter(key => columnMapping[key]).length;
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Import Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">File Name</p>
              <p className="font-semibold text-gray-800">{fileData?.metadata?.fileName || 'Unknown'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Rows</p>
            <p className="font-semibold text-gray-800">{fileData?.totalRows || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Columns Mapped</p>
              <p className="font-semibold text-gray-800">{mappedCount} of {fileData?.headers?.length || 0}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Valid Records</p>
            <p className="font-semibold text-gray-800">{fileData?.totalRows || 0}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <Clock className="w-5 h-5 text-yellow-600" />
          <p className="text-sm text-yellow-700">Import may take a few moments depending on file size</p>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={onConfirm} loading={isImporting}>
          {isImporting ? 'Importing...' : 'Confirm Import'}
        </Button>
      </div>
    </div>
  );
};

export default ImportSummary;