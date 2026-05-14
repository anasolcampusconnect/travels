import React, { useState } from 'react';
import Button from '../components/common/Button';
import ImportWizard from '../components/import/ImportWizard';

const ImportPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Import Data</h1>
        <p className="text-white/80">Import your data from CSV, JSON, or Excel files</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Import Wizard</h2>
            <p className="text-gray-500 text-sm">Step-by-step guided import process</p>
          </div>
          <Button variant="primary" onClick={() => setShowWizard(true)} icon="➕">
            New Import
          </Button>
        </div>
        
        {showWizard && (
          <ImportWizard
            onClose={() => setShowWizard(false)}
            onComplete={(data) => {
              console.log('Import completed:', data);
              setShowWizard(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImportPage;