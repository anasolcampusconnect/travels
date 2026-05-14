export const APP_CONFIG = {
  name: 'Data Import/Export Tool',
  version: '1.0.0',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFileTypes: ['.csv', '.json', '.xlsx', '.xls'],
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  },
  localStorage: {
    prefix: 'import_export_',
    keys: {
      settings: 'settings',
      history: 'history',
      recentImports: 'recent_imports',
      recentExports: 'recent_exports'
    }
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3
  }
};