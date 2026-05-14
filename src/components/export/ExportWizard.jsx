import React, { useState } from 'react';
import Modal from '../common/Modal';
import FormatSelector from './FormatSelector';
import FieldSelector from './FieldSelector';
import FilterBuilder from './FilterBuilder';
import ExportSummary from './ExportSummary';
import { useExport } from '../../contexts/ExportContext';
import exportFormatterService from '../../services/exportFormatter';

const ExportWizard = ({ data, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    selectedFields: [],
    filters: {},
    options: {}
  });
  const [isExporting, setIsExporting] = useState(false);
  const { dispatch } = useExport();
  
  const steps = [
    { number: 1, title: 'Select Format', icon: '📊' },
    { number: 2, title: 'Choose Fields', icon: '✅' },
    { number: 3, title: 'Apply Filters', icon: '🔍' },
    { number: 4, title: 'Export', icon: '📤' }
  ];
  
  const handleFormatSelect = (format, options) => {
    setExportConfig(prev => ({ ...prev, format, options }));
    setStep(2);
  };
  
  const handleFieldsSelect = (selectedFields) => {
    setExportConfig(prev => ({ ...prev, selectedFields }));
    setStep(3);
  };
  
  const handleFiltersApply = (filters) => {
    setExportConfig(prev => ({ ...prev, filters }));
    setStep(4);
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    
    // Filter data based on selected fields and filters
    let exportData = { ...data };
    
    if (exportConfig.selectedFields.length > 0) {
      exportData.rows = data.rows.map(row => {
        const filteredRow = {};
        exportConfig.selectedFields.forEach(field => {
          filteredRow[field] = row[field];
        });
        return filteredRow;
      });
      exportData.headers = exportConfig.selectedFields;
    }
    
    // Apply filters
    if (Object.keys(exportConfig.filters).length > 0) {
      exportData.rows = exportData.rows.filter(row => {
        return Object.entries(exportConfig.filters).every(([field, value]) => {
          if (!value) return true;
          if (typeof value === 'object') {
            if (value.min && row[field] < value.min) return false;
            if (value.max && row[field] > value.max) return false;
            if (value.contains && !String(row[field]).includes(value.contains)) return false;
            return true;
          }
          return row[field] === value;
        });
      });
    }
    
    try {
      const result = await exportFormatterService.exportData(
        exportData,
        exportConfig.format,
        {
          filename: `export_${Date.now()}.${exportConfig.format}`,
          ...exportConfig.options
        }
      );
      
      const exportRecord = {
        format: exportConfig.format,
        rowCount: exportData.rows.length,
        filename: result.filename,
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_TO_HISTORY', payload: exportRecord });
      
      setTimeout(() => {
        setIsExporting(false);
        onComplete(exportRecord);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };
  
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Export Wizard - ${steps[step - 1].title}`}
      size="lg"
      showCloseButton={!isExporting}
    >
      <div className="export-wizard">
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
            <FormatSelector onSelect={handleFormatSelect} />
          )}
          
          {step === 2 && (
            <FieldSelector
              headers={data.headers}
              onSelect={handleFieldsSelect}
              onBack={() => setStep(1)}
            />
          )}
          
          {step === 3 && (
            <FilterBuilder
              headers={data.headers}
              onApply={handleFiltersApply}
              onBack={() => setStep(2)}
            />
          )}
          
          {step === 4 && (
            <ExportSummary
              config={exportConfig}
              data={data}
              onConfirm={handleExport}
              isExporting={isExporting}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExportWizard;