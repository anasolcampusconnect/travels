// src/components/export/FieldSelector.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const FieldSelector = ({ headers, onSelect, onBack }) => {
  const [selectedFields, setSelectedFields] = useState(headers);
  
  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  
  const toggleAll = () => {
    if (selectedFields.length === headers.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields([...headers]);
    }
  };
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Fields to Export</h3>
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFields.length === headers.length}
            onChange={toggleAll}
            className="w-4 h-4 text-purple-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Select All</span>
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {headers.map(header => (
          <label key={header} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFields.includes(header)}
              onChange={() => toggleField(header)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-sm text-gray-600">{header}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={() => onSelect(selectedFields)}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default FieldSelector;