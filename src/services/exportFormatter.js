// src/services/exportFormatter.js
export const exportFormatter = {
  formatCSV: (data) => {
    if (!data || !data.length) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => row[h] || '').join(','));
    return [headers.join(','), ...rows].join('\n');
  },

  formatJSON: (data) => {
    return JSON.stringify(data, null, 2);
  },

  download: (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
};