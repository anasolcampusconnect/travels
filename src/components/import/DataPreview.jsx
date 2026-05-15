// src/components/import/DataPreview.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const DataPreview = ({ data, headers, onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Preview</h3>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Total Rows: {data.length.toLocaleString()}</span>
          <span>Total Columns: {headers.length}</span>
        </div>
      </div>
      
      <div className="overflow-x-auto border rounded-lg mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {headers.map(header => (
                <th key={header} className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {headers.map(header => (
                  <td key={header} className="px-4 py-2 border-b text-gray-600">
                    {row[header] !== null && row[header] !== undefined
                      ? String(row[header]).substring(0, 50)
                      : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button variant="primary" onClick={onNext}>Continue to Column Mapping →</Button>
      </div>
    </div>
  );
};

export default DataPreview;