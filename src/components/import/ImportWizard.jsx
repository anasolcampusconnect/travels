import React, { useState } from 'react';
import FileUploader from './FileUploader';
import DataPreview from './DataPreview';
import ColumnMapper from './ColumnMapper';
import ImportSummary from './ImportSummary';
import Modal from '../common/Modal';
import { useImport } from '../../contexts/ImportContext';
import fileParserService from '../../services/fileParser';

const ImportWizard = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [fileData, setFileData] = useState(null);
  const [columnMapping, setColumnMapping] = useState({});
  const [isImporting, setIsImporting] = useState(false);
  const { dispatch } = useImport();
  
  const steps = [
    { number: 1, title: 'Upload File', icon: '📁' },
    { number: 2, title: 'Preview Data', icon: '👁️' },
    { number: 3, title: 'Map Columns', icon: '🔄' },
    { number: 4, title: 'Complete', icon: '✅' }
  ];
  
  const handleFileUpload = async (file) => {
    const fileType = fileParserService.getFileType(file.name);
    const parsedData = await fileParserService.parseFile(file, fileType);
    setFileData(parsedData);
    setStep(2);
  };
  
  const handleMappingComplete = (mapping) => {
    setColumnMapping(mapping);
    setStep(3);
  };
  
  const handleImport = async () => {
    setIsImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      const importRecord = {
        filename: fileData.metadata.fileName,
        rowCount: fileData.totalRows,
        columnMapping: columnMapping,
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_TO_HISTORY', payload: importRecord });
      setIsImporting(false);
      setStep(4);
      
      setTimeout(() => {
        onComplete(importRecord);
        onClose();
      }, 2000);
    }, 2000);
  };
  
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Import Wizard - ${steps[step - 1].title}`}
      size="lg"
      showCloseButton={!isImporting}
    >
      <div className="import-wizard">
        <div className="wizard-steps">
          {steps.map((s, index) => (
            <div
              key={s.number}
              className={`wizard-step ${step === s.number ? 'active' : ''} ${
                step > s.number ? 'completed' : ''
              }`}
            >
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          ))}
        </div>
        
        <div className="wizard-content">
          {step === 1 && (
            <FileUploader onUploadComplete={handleFileUpload} />
          )}
          
          {step === 2 && fileData && (
            <DataPreview
              data={fileData.data}
              headers={fileData.headers}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          
          {step === 3 && fileData && (
            <ColumnMapper
              sourceColumns={fileData.headers}
              onMappingComplete={handleMappingComplete}
              onBack={() => setStep(2)}
            />
          )}
          
          {step === 4 && (
            <ImportSummary
              fileData={fileData}
              columnMapping={columnMapping}
              onConfirm={handleImport}
              isImporting={isImporting}
            />
          )}
        </div>
      </div>
      
      <style jsx>{`
        .import-wizard {
          min-height: 500px;
        }
        
        .wizard-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding: 1rem 0;
          position: relative;
        }
        
        .wizard-step {
          flex: 1;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .step-icon {
          width: 40px;
          height: 40px;
          background: #e5e7eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }
        
        .wizard-step.active .step-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: scale(1.1);
        }
        
        .wizard-step.completed .step-icon {
          background: #10b981;
          color: white;
        }
        
        .step-title {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .wizard-step.active .step-title {
          color: #667eea;
          font-weight: 600;
        }
        
        .step-line {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #e5e7eb;
          z-index: -1;
        }
        
        .wizard-step:last-child .step-line {
          display: none;
        }
        
        .wizard-content {
          margin-top: 2rem;
        }
      `}</style>
    </Modal>
  );
};

export default ImportWizard;