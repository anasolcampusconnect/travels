// src/components/export/FilterBuilder.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const FilterBuilder = ({ headers, onApply, onBack }) => {
  const [filters, setFilters] = useState({});
  
  const addFilter = () => {
    // Implementation for adding filters
  };
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Apply Filters (Optional)</h3>
      <p className="text-gray-500 text-sm mb-6">
        Filter your data before export to get exactly what you need
      </p>
      <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
        <p className="text-gray-400">Filter builder coming soon</p>
        <p className="text-xs text-gray-400 mt-1">Advanced filtering options will be available</p>
      </div>
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={() => onApply(filters)}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default FilterBuilder;