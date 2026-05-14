import React, { useState } from 'react';
import Button from '../common/Button';

const FilterBuilder = ({ headers, onApply, onBack }) => {
  const [filters, setFilters] = useState({});
  
  return (
    <div>
      <h3>Apply Filters (Optional)</h3>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
        Filter your data before export
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={() => onApply(filters)}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default FilterBuilder;