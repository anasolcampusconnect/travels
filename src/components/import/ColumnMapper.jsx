// src/components/import/ColumnMapper.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const ColumnMapper = ({ sourceColumns, onMappingComplete, onBack }) => {
  const [mapping, setMapping] = useState({});
  const [targetColumns] = useState([
    'id', 'name', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'
  ]);
  
  const handleMappingChange = (sourceCol, targetCol) => {
    setMapping(prev => ({ ...prev, [sourceCol]: targetCol }));
  };
  
  const handleAutoMap = () => {
    const autoMapping = {};
    sourceColumns.forEach(source => {
      const normalizedSource = source.toLowerCase().replace(/[^a-z]/g, '');
      const match = targetColumns.find(target => 
        normalizedSource.includes(target.toLowerCase()) ||
        target.toLowerCase().includes(normalizedSource)
      );
      if (match) autoMapping[source] = match;
    });
    setMapping(autoMapping);
  };
  
  const getMappedCount = () => Object.keys(mapping).filter(key => mapping[key]).length;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Column Mapping</h3>
        <Button variant="outline" size="sm" onClick={handleAutoMap}>
          🔄 Auto-Map
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Source Columns ({sourceColumns.length})</h4>
          <div className="border rounded-lg max-h-96 overflow-y-auto">
            {sourceColumns.map(col => (
              <div key={col} className="flex items-center gap-3 p-3 border-b hover:bg-gray-50">
                <div className="flex-1 font-medium text-gray-800 text-sm">{col}</div>
                <div className="text-gray-400">→</div>
                <select
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={mapping[col] || ''}
                  onChange={(e) => handleMappingChange(col, e.target.value)}
                >
                  <option value="">-- Skip Column --</option>
                  {targetColumns.map(target => (
                    <option key={target} value={target}>{target}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Target Schema</h4>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {targetColumns.map(col => (
                <span key={col} className="px-3 py-1.5 bg-purple-100 border border-purple-200 rounded-lg text-sm text-purple-700">
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Mapped: {getMappedCount()}/{sourceColumns.length}</span>
          <span>Skipped: {sourceColumns.length - getMappedCount()}</span>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={() => onMappingComplete(mapping)} disabled={getMappedCount() === 0}>
          Continue to Import →
        </Button>
      </div>
    </div>
  );
};

export default ColumnMapper;