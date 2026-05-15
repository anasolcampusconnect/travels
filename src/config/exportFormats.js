// src/config/exportFormats.js
export const EXPORT_FORMATS = {
  CSV: { id: 'csv', label: 'CSV', extension: '.csv', mimeType: 'text/csv' },
  JSON: { id: 'json', label: 'JSON', extension: '.json', mimeType: 'application/json' },
  EXCEL: { id: 'excel', label: 'Excel', extension: '.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  PDF: { id: 'pdf', label: 'PDF', extension: '.pdf', mimeType: 'application/pdf' }
};