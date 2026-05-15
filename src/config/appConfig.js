// src/config/appConfig.js
export const APP_CONFIG = {
  name: 'ParcelTrack',
  version: '1.0.0',
  maxFileSize: 10 * 1024 * 1024,
  supportedFileTypes: ['.csv', '.json', '.xlsx', '.xls'],
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  }
};