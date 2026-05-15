// src/components/export/ExportWizard.jsx
import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, CheckCircle,
  FileJson, FileSpreadsheet, FileText, 
  Filter, Columns, Download, Zap, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

const ExportWizard = ({ data, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedFields, setSelectedFields] = useState(data.headers || []);
  const [isExporting, setIsExporting] = useState(false);
  
  const formats = [
    { id: 'csv', name: 'CSV', icon: FileText, color: 'from-blue-500 to-cyan-500', desc: 'Comma separated values' },
    { id: 'json', name: 'JSON', icon: FileJson, color: 'from-yellow-500 to-orange-500', desc: 'JavaScript object notation' },
    { id: 'excel', name: 'Excel', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-500', desc: 'Microsoft Excel format' },
    { id: 'pdf', name: 'PDF', icon: FileText, color: 'from-red-500 to-rose-500', desc: 'Portable document format' }
  ];
  
  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    onComplete({ format: selectedFormat, fields: selectedFields });
    onClose();
  };
  
  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
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
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Steps Indicator */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <motion.div 
                  animate={{ scale: step >= s ? 1 : 0.9 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <motion.div 
                    animate={{ scaleX: step > s ? 1 : 0.3 }}
                    className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-2">
            <span className="text-xs text-white/60">Select Format</span>
            <span className="text-xs text-white/60">Choose Fields</span>
            <span className="text-xs text-white/60">Export</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Format */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Choose Export Format</h3>
                <div className="grid grid-cols-2 gap-4">
                  {formats.map((format) => {
                    const Icon = format.icon;
                    const isSelected = selectedFormat === format.id;
                    return (
                      <motion.div
                        key={format.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFormat(format.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected 
                            ? `border-purple-500 bg-gradient-to-r ${format.color}/20` 
                            : 'border-white/20 bg-white/5 hover:border-purple-500/50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${format.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white">{format.name}</h4>
                        <p className="text-xs text-white/60 mt-1">{format.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Choose Fields */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Select Fields to Export</h3>
                  <button 
                    onClick={() => setSelectedFields(data.headers)}
                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {data.headers.map((header) => (
                    <motion.label 
                      key={header} 
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-3 p-3 border border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                    >
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
                        className="w-4 h-4 text-purple-500 rounded border-white/30 bg-white/10 focus:ring-purple-500"
                      />
                      <span className="text-white/80">{header}</span>
                    </motion.label>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-white/70">
                    Selected: <span className="font-semibold text-purple-300">{selectedFields.length}</span> of {data.headers.length} fields
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Export Summary */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Export Summary</h3>
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Format</p>
                        <p className="font-semibold text-white capitalize">{selectedFormat}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">File Extension</p>
                      <p className="font-mono text-sm text-white">.{selectedFormat}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                        <Columns className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Fields</p>
                        <p className="font-semibold text-white">{selectedFields.length} columns</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60">Records</p>
                      <p className="font-semibold text-white">{data.rows?.length || 0} rows</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 p-4 bg-green-500/20 rounded-xl border border-green-500/30"
                  >
                    <Zap className="w-5 h-5 text-green-300" />
                    <p className="text-sm text-green-200">Your export will be ready in seconds</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/20 flex justify-between">
          {step > 1 && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>
          )}
          {step < 3 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !selectedFormat}
              className="flex items-center gap-2 px-6 py-2 ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2 ml-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isExporting ? <Clock className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Confirm Export'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportWizard;