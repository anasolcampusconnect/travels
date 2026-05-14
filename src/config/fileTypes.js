export const FILE_TYPES = {
  CSV: {
    mimeTypes: ['text/csv', 'application/vnd.ms-excel'],
    extensions: ['.csv'],
    parser: 'csv',
    icon: '📄'
  },
  JSON: {
    mimeTypes: ['application/json'],
    extensions: ['.json'],
    parser: 'json',
    icon: '🔧'
  },
  EXCEL: {
    mimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
    extensions: ['.xlsx', '.xls'],
    parser: 'excel',
    icon: '📊'
  }
};

export const VALIDATION_RULES = {
  required: { message: 'This field is required', level: 'error' },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format', level: 'error' },
  numeric: { pattern: /^\d+$/, message: 'Must be numeric', level: 'error' },
  date: { pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'Use YYYY-MM-DD format', level: 'warning' }
};