import React, { useState } from 'react';
import Button from '../common/Button';

const ColumnMapper = ({ sourceColumns, onMappingComplete, onBack }) => {
  const [mapping, setMapping] = useState({});
  const [targetColumns, setTargetColumns] = useState([
    'id', 'name', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country', 'date'
  ]);
  const [customTarget, setCustomTarget] = useState('');
  
  const handleMappingChange = (sourceCol, targetCol) => {
    setMapping(prev => ({ ...prev, [sourceCol]: targetCol }));
  };
  
  const handleAddCustomColumn = () => {
    if (customTarget && !targetColumns.includes(customTarget)) {
      setTargetColumns([...targetColumns, customTarget]);
      setCustomTarget('');
    }
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
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Column Mapping</h3>
          <p className="text-sm text-gray-500 mt-1">Map your source columns to target database fields</p>
        </div>
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
                <div className="flex-1 font-medium text-gray-800">{col}</div>
                <div className="text-gray-400">→</div>
                <select
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {targetColumns.map(col => (
                <span key={col} className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700">
                  {col}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add custom column..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomColumn()}
            />
            <Button size="sm" onClick={handleAddCustomColumn}>Add</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
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