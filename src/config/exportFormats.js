export const EXPORT_FORMATS = {
  CSV: {
    id: 'csv',
    label: 'CSV (Comma Separated)',
    extension: '.csv',
    mimeType: 'text/csv',
    icon: '📊',
    options: {
      delimiter: ',',
      encoding: 'UTF-8',
      includeHeaders: true
    }
  },
  JSON: {
    id: 'json',
    label: 'JSON (JavaScript Object Notation)',
    extension: '.json',
    mimeType: 'application/json',
    icon: '🔧',
    options: {
      pretty: true,
      includeMetadata: false
    }
  },
  EXCEL: {
    id: 'excel',
    label: 'Excel (.xlsx)',
    extension: '.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    icon: '📈',
    options: {
      sheetName: 'Export',
      autoWidth: true
    }
  },
  PDF: {
    id: 'pdf',
    label: 'PDF Document',
    extension: '.pdf',
    mimeType: 'application/pdf',
    icon: '📕',
    options: {
      orientation: 'portrait',
      pageSize: 'A4'
    }
  }
};

export const ENCODING_OPTIONS = [
  { value: 'UTF-8', label: 'UTF-8' },
  { value: 'UTF-16', label: 'UTF-16' },
  { value: 'ASCII', label: 'ASCII' }
];

export const DELIMITER_OPTIONS = [
  { value: ',', label: 'Comma (,)' },
  { value: ';', label: 'Semicolon (;)' },
  { value: '\t', label: 'Tab' },
  { value: '|', label: 'Pipe (|)' }
];