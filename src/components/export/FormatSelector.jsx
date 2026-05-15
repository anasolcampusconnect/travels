// src/components/export/FormatSelector.jsx
import React, { useState } from 'react';
import { FileJson, FileSpreadsheet, FileText, File } from 'lucide-react';
import Button from '../common/Button';

const FormatSelector = ({ onSelect }) => {
  const formats = [
    { id: 'csv', name: 'CSV', icon: FileText, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100', description: 'Comma Separated Values' },
    { id: 'json', name: 'JSON', icon: FileJson, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-100', description: 'JavaScript Object Notation' },
    { id: 'excel', name: 'Excel', icon: FileSpreadsheet, color: 'from-green-500 to-emerald-500', bg: 'bg-green-100', description: 'Microsoft Excel Format' },
    { id: 'pdf', name: 'PDF', icon: File, color: 'from-red-500 to-rose-500', bg: 'bg-red-100', description: 'PDF Document' }
  ];
  
  const [selected, setSelected] = useState(null);
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Export Format</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {formats.map(format => {
          const Icon = format.icon;
          const isSelected = selected === format.id;
          return (
            <div
              key={format.id}
              onClick={() => setSelected(format.id)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                isSelected 
                  ? `border-purple-500 bg-gradient-to-r ${format.color}/10` 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${format.color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800">{format.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{format.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end pt-4 border-t">
        <Button 
          variant="primary" 
          onClick={() => onSelect(selected, {})}
          disabled={!selected}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default FormatSelector;