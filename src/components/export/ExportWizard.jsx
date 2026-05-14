import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, CheckCircle,
  FileJson, FileSpreadsheet, FileText, File as FilePdf,
  Filter, Columns, Download, Zap, Shield, Clock
} from 'lucide-react';
import Button from '../common/Button';

const ExportWizard = ({ data, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFields, setSelectedFields] = useState(data.headers || []);
  const [isExporting, setIsExporting] = useState(false);
  
  const formats = [
    { id: 'csv', name: 'CSV', icon: FileText, color: 'blue', desc: 'Comma separated values', extension: '.csv' },
    { id: 'json', name: 'JSON', icon: FileJson, color: 'yellow', desc: 'JavaScript object notation', extension: '.json' },
    { id: 'excel', name: 'Excel', icon: FileSpreadsheet, color: 'green', desc: 'Microsoft Excel format', extension: '.xlsx' },
    { id: 'pdf', name: 'PDF', icon: FilePdf, color: 'red', desc: 'Portable document format', extension: '.pdf' }
  ];
  
  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    onComplete({ format: selectedFormat, fields: selectedFields });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Export Wizard</h2>
                <p className="text-white/80 text-sm">Step {step} of 3</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Steps Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-purple-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Select Format</span>
            <span className="text-xs text-gray-500">Choose Fields</span>
            <span className="text-xs text-gray-500">Export</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Select Format */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Export Format</h3>
              <div className="grid grid-cols-2 gap-4">
                {formats.map((format) => {
                  const Icon = format.icon;
                  const isSelected = selectedFormat === format.id;
                  return (
                    <div
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${format.color}-100 flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 text-${format.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-800">{format.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{format.desc}</p>
                      <p className="text-xs text-gray-400 mt-2">{format.extension}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Step 2: Choose Fields */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Select Fields to Export</h3>
                <button 
                  onClick={() => setSelectedFields(data.headers)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Select All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.headers.map((header) => (
                  <label key={header} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(header)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFields([...selectedFields, header]);
                        } else {
                          setSelectedFields(selectedFields.filter(f => f !== header));
                        }
                      }}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-gray-700">{header}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected: <span className="font-semibold">{selectedFields.length}</span> of {data.headers.length} fields
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Export Summary */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Format</p>
                      <p className="font-semibold text-gray-800 capitalize">{selectedFormat}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">File Extension</p>
                    <p className="font-mono text-sm">.{selectedFormat}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Columns className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fields</p>
                      <p className="font-semibold text-gray-800">{selectedFields.length} columns</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Records</p>
                    <p className="font-semibold text-gray-800">{data.rows?.length || 0} rows</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <Zap className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700">Your export will be ready in seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !selectedFormat}
              className="flex items-center gap-2 px-6 py-2 ml-auto bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2 ml-auto bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isExporting ? <Clock className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Confirm Export'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportWizard;