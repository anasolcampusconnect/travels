export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

export const IMPORT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  VALIDATING: 'validating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

export const EXPORT_STATUS = {
  PREPARING: 'preparing',
  GENERATING: 'generating',
  READY: 'ready',
  DOWNLOADING: 'downloading',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const DATA_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  NULL: 'null'
};

export const MESSAGES = {
  IMPORT: {
    SUCCESS: 'Data imported successfully!',
    FAILED: 'Import failed. Please try again.',
    NO_FILE: 'Please select a file to import',
    INVALID_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File size exceeds maximum limit'
  },
  EXPORT: {
    SUCCESS: 'Export completed successfully!',
    FAILED: 'Export failed. Please try again.',
    NO_DATA: 'No data available to export'
  }
};

export const STORAGE_KEYS = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  USER_PREFERENCES: 'user_preferences',
  IMPORT_HISTORY: 'import_history',
  EXPORT_HISTORY: 'export_history'
};