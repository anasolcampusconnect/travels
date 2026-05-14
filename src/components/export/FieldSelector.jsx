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
    <div>
      <h3>Select Fields to Export</h3>
      <div style={{ margin: '1rem 0' }}>
        <label>
          <input
            type="checkbox"
            checked={selectedFields.length === headers.length}
            onChange={toggleAll}
          />
          Select All
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
        {headers.map(header => (
          <label key={header}>
            <input
              type="checkbox"
              checked={selectedFields.includes(header)}
              onChange={() => toggleField(header)}
            />
            {' '}{header}
          </label>
        ))}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={() => onSelect(selectedFields)}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default FieldSelector;