import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FILE_TYPES } from '../config/fileTypes';

class FileParserService {
  async parseFile(file, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          let data;
          switch (type) {
            case 'csv':
              data = await this.parseCSV(e.target.result);
              break;
            case 'json':
              data = this.parseJSON(e.target.result);
              break;
            case 'excel':
              data = this.parseExcel(e.target.result);
              break;
            default:
              throw new Error('Unsupported file type');
          }
          
          resolve({
            data: data.rows,
            headers: data.headers,
            totalRows: data.rows.length,
            metadata: {
              fileName: file.name,
              fileSize: file.size,
              fileType: type,
              parsedAt: new Date().toISOString()
            }
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (type === 'excel') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  }
  
  parseCSV(content) {
    const result = Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    
    if (result.errors.length > 0) {
      console.warn('CSV parsing warnings:', result.errors);
    }
    
    return {
      headers: result.meta.fields || [],
      rows: result.data
    };
  }
  
  parseJSON(content) {
    const data = JSON.parse(content);
    let rows = [];
    let headers = [];
    
    if (Array.isArray(data)) {
      rows = data;
      if (rows.length > 0) {
        headers = Object.keys(rows[0]);
      }
    } else if (data.data && Array.isArray(data.data)) {
      rows = data.data;
      headers = data.headers || (rows[0] ? Object.keys(rows[0]) : []);
    } else {
      throw new Error('Invalid JSON structure. Expected array or object with data property');
    }
    
    return { headers, rows };
  }
  
  parseExcel(content) {
    const workbook = XLSX.read(content, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    
    return {
      headers,
      rows: data
    };
  }
  
  async validateFile(file, allowedTypes) {
    const errors = [];
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errors.push('File size must be less than 10MB');
    }
    
    // Check file type
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (allowedTypes && !allowedTypes.includes(extension)) {
      errors.push(`File type ${extension} not supported. Supported: ${allowedTypes.join(', ')}`);
    }
    
    // Try to parse preview
    try {
      const fileType = this.getFileType(file.name);
      if (fileType) {
        await this.parseFile(file, fileType);
      }
    } catch (error) {
      errors.push(`File validation failed: ${error.message}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  getFileType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    if (extension === 'csv') return 'csv';
    if (extension === 'json') return 'json';
    if (['xlsx', 'xls'].includes(extension)) return 'excel';
    return null;
  }
  
  async getFilePreview(file, previewRows = 5) {
    const fileType = this.getFileType(file.name);
    if (!fileType) {
      throw new Error('Unsupported file type');
    }
    
    const parsed = await this.parseFile(file, fileType);
    return {
      headers: parsed.headers,
      preview: parsed.data.slice(0, previewRows),
      totalRows: parsed.totalRows
    };
  }
}

export default new FileParserService();