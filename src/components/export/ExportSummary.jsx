// src/components/export/ExportSummary.jsx
import React from 'react';
import Button from '../common/Button';

const ExportSummary = ({ config, data, onConfirm, isExporting, onBack }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Summary</h3>
      <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
        <p className="text-sm"><strong className="text-gray-700">Format:</strong> <span className="text-gray-600 capitalize">{config.format}</span></p>
        <p className="text-sm"><strong className="text-gray-700">Fields:</strong> <span className="text-gray-600">{config.selectedFields?.length || 0} selected</span></p>
        <p className="text-sm"><strong className="text-gray-700">Total Records:</strong> <span className="text-gray-600">{data?.rows?.length || 0}</span></p>
      </div>
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack} disabled={isExporting}>
          Back
        </Button>
        <Button variant="primary" onClick={onConfirm} loading={isExporting}>
          {isExporting ? 'Exporting...' : 'Confirm Export'}
        </Button>
      </div>
    </div>
  );
};

export default ExportSummary;