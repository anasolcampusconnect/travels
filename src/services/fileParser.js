// src/services/fileParser.js
import Papa from 'papaparse';

export const fileParser = {
  parseCSV: (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          resolve({
            data: results.data,
            headers: results.meta.fields,
            totalRows: results.data.length
          });
        },
        error: reject
      });
    });
  },

  parseJSON: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const rows = Array.isArray(data) ? data : data.data || [];
          const headers = rows[0] ? Object.keys(rows[0]) : [];
          resolve({ data: rows, headers, totalRows: rows.length });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
};