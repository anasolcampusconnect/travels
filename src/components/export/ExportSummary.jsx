import React from 'react';
import Button from '../common/Button';

const ExportSummary = ({ config, data, onConfirm, isExporting, onBack }) => {
  return (
    <div>
      <h3>Export Summary</h3>
      <div style={{ margin: '1rem 0', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
        <p><strong>Format:</strong> {config.format.toUpperCase()}</p>
        <p><strong>Fields:</strong> {config.selectedFields.length} selected</p>
        <p><strong>Total Records:</strong> {data.rows.length}</p>
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
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