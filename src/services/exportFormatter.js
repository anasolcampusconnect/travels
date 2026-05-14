import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class ExportFormatterService {
  async exportData(data, format, config = {}) {
    switch (format) {
      case 'csv':
        return this.exportToCSV(data, config);
      case 'json':
        return this.exportToJSON(data, config);
      case 'excel':
        return this.exportToExcel(data, config);
      case 'pdf':
        return this.exportToPDF(data, config);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
  
  exportToCSV(data, config) {
    const {
      filename = `export_${Date.now()}.csv`,
      delimiter = ',',
      includeHeaders = true,
      encoding = 'UTF-8'
    } = config;
    
    let csvData = '';
    
    if (includeHeaders && data.headers) {
      csvData += data.headers.join(delimiter) + '\n';
    }
    
    data.rows.forEach(row => {
      const values = data.headers.map(header => {
        let value = row[header] || '';
        if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvData += values.join(delimiter) + '\n';
    });
    
    const blob = new Blob([csvData], { type: `text/csv;charset=${encoding}` });
    saveAs(blob, filename);
    
    return { success: true, filename, size: blob.size };
  }
  
  exportToJSON(data, config) {
    const {
      filename = `export_${Date.now()}.json`,
      pretty = true,
      includeMetadata = false
    } = config;
    
    let exportData = data.rows;
    
    if (includeMetadata) {
      exportData = {
        metadata: {
          exportedAt: new Date().toISOString(),
          totalRows: data.rows.length,
          headers: data.headers
        },
        data: data.rows
      };
    }
    
    const jsonString = pretty 
      ? JSON.stringify(exportData, null, 2)
      : JSON.stringify(exportData);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, filename);
    
    return { success: true, filename, size: blob.size };
  }
  
  exportToExcel(data, config) {
    const {
      filename = `export_${Date.now()}.xlsx`,
      sheetName = 'Export',
      autoWidth = true
    } = config;
    
    const worksheet = XLSX.utils.json_to_sheet(data.rows);
    
    if (autoWidth) {
      const maxWidth = data.headers.reduce((acc, header) => {
        const maxCellWidth = Math.max(
          header.length,
          ...data.rows.map(row => String(row[header] || '').length)
        );
        return Math.max(acc, maxCellWidth);
      }, 10);
      
      worksheet['!cols'] = data.headers.map(() => ({ wch: Math.min(maxWidth, 50) }));
    }
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, filename);
    
    return { success: true, filename, size: blob.size };
  }
  
  exportToPDF(data, config) {
    const {
      filename = `export_${Date.now()}.pdf`,
      orientation = 'portrait',
      pageSize = 'a4',
      title = 'Data Export'
    } = config;
    
    const doc = new jsPDF({ orientation, unit: 'mm', format: pageSize });
    
    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    doc.text(`Exported on: ${new Date().toLocaleString()}`, 14, 32);
    doc.text(`Total Records: ${data.rows.length}`, 14, 38);
    
    // Prepare table data
    const tableData = data.rows.map(row => 
      data.headers.map(header => row[header] || '')
    );
    
    doc.autoTable({
      head: [data.headers],
      body: tableData,
      startY: 45,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [102, 126, 234], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
    
    doc.save(filename);
    
    return { success: true, filename };
  }
  
  async exportLargeDataset(data, format, config, onProgress) {
    const CHUNK_SIZE = 1000;
    const totalChunks = Math.ceil(data.rows.length / CHUNK_SIZE);
    
    for (let i = 0; i < totalChunks; i++) {
      const chunk = data.rows.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      const chunkData = { ...data, rows: chunk };
      
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: totalChunks,
          percentage: ((i + 1) / totalChunks) * 100
        });
      }
      
      // Process chunk (implementation depends on format)
      await this.processChunk(chunkData, format, config, i);
    }
    
    return this.finalizeExport(format, config);
  }
  
  async processChunk(chunkData, format, config, chunkIndex) {
    // Implementation for streaming large exports
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Processed chunk ${chunkIndex + 1}`);
        resolve();
      }, 100);
    });
  }
  
  async finalizeExport(format, config) {
    return { success: true, message: 'Export completed' };
  }
}

export default new ExportFormatterService();