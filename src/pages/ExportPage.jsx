import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ExportWizard from '../components/export/ExportWizard';

const ExportPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  
  const sampleData = {
    headers: ['id', 'name', 'email', 'phone', 'city'],
    rows: [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', city: 'New York' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', city: 'Los Angeles' },
    ]
  };
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Export Data</h1>
        <p className="text-white/80">Export your data in multiple formats</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Export Wizard</h2>
            <p className="text-gray-500 text-sm">Choose format and customize your export</p>
          </div>
          <Button variant="primary" onClick={() => setShowWizard(true)} icon="➕">
            New Export
          </Button>
        </div>
        
        {showWizard && (
          <ExportWizard
            data={sampleData}
            onClose={() => setShowWizard(false)}
            onComplete={(data) => {
              console.log('Export completed:', data);
              setShowWizard(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ExportPage;