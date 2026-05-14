import React, { useState } from 'react';
import Button from '../common/Button';

const FormatSelector = ({ onSelect }) => {
  const formats = [
    { id: 'csv', name: 'CSV', icon: '📊', description: 'Comma Separated Values' },
    { id: 'json', name: 'JSON', icon: '🔧', description: 'JavaScript Object Notation' },
    { id: 'excel', name: 'Excel', icon: '📈', description: 'Microsoft Excel Format' },
    { id: 'pdf', name: 'PDF', icon: '📕', description: 'PDF Document' }
  ];
  
  const [selected, setSelected] = useState(null);
  
  return (
    <div>
      <h3>Select Export Format</h3>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {formats.map(format => (
          <div
            key={format.id}
            onClick={() => setSelected(format.id)}
            style={{
              padding: '1rem',
              border: selected === format.id ? '2px solid #667eea' : '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              background: selected === format.id ? '#f3f4f6' : 'white'
            }}
          >
            <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{format.icon}</span>
            <strong>{format.name}</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
              {format.description}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
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