// src/components/import/ImportWizard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import FileUploader from './FileUploader';
import DataPreview from './DataPreview';
import ColumnMapper from './ColumnMapper';
import ImportSummary from './ImportSummary';
import Modal from '../common/Modal';

const ImportWizard = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [fileData, setFileData] = useState(null);
  const [columnMapping, setColumnMapping] = useState({});
  const [isImporting, setIsImporting] = useState(false);
  
  const steps = [
    { number: 1, title: 'Upload File', icon: '📁' },
    { number: 2, title: 'Preview Data', icon: '👁️' },
    { number: 3, title: 'Map Columns', icon: '🔄' },
    { number: 4, title: 'Complete', icon: '✅' }
  ];
  
  const handleFileUpload = async (file) => {
    // Simulate file parsing
    const parsedData = {
      headers: ['name', 'email', 'phone', 'address'],
      data: [
        { name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: 'New York' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: 'Los Angeles' }
      ],
      totalRows: 2,
      metadata: { fileName: file.name, fileSize: file.size }
    };
    setFileData(parsedData);
    setStep(2);
  };
  
  const handleMappingComplete = (mapping) => {
    setColumnMapping(mapping);
    setStep(4);
  };
  
  const handleImport = async () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      onComplete({ success: true, rows: fileData?.totalRows });
      onClose();
    }, 2000);
  };
  
  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };
  
  return (
    <Modal isOpen={true} onClose={onClose} title="Import Wizard" size="lg" showCloseButton={!isImporting}>
      <div className="wizard-steps flex justify-between mb-8 px-4">
        {steps.map((s, index) => (
          <div key={s.number} className="flex-1 text-center relative">
            <div className={`step-circle w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all ${
              step >= s.number ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > s.number ? <CheckCircle className="w-5 h-5" /> : <span>{s.number}</span>}
            </div>
            <span className="text-xs text-gray-500">{s.title}</span>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                step > s.number ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="wizard-content min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <FileUploader onUploadComplete={handleFileUpload} />
            </motion.div>
          )}
          
          {step === 2 && fileData && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <DataPreview
                data={fileData.data}
                headers={fileData.headers}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
          
          {step === 3 && fileData && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ColumnMapper
                sourceColumns={fileData.headers}
                onMappingComplete={handleMappingComplete}
                onBack={() => setStep(2)}
              />
            </motion.div>
          )}
          
          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ImportSummary
                fileData={fileData}
                columnMapping={columnMapping}
                onConfirm={handleImport}
                onBack={() => setStep(3)}
                isImporting={isImporting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .step-circle {
          transition: all 0.3s ease;
        }
      `}</style>
    </Modal>
  );
};

export default ImportWizard;