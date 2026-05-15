import React, { useState } from 'react';
import { 
  History, Calendar, Download, Search, Filter,
  CheckCircle, XCircle, Clock, Eye, Truck
} from 'lucide-react';

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('imports');
  
  const imports = [
    { id: 1, filename: 'customer_data.csv', rows: 1250, status: 'success', date: '2024-01-15 10:30 AM', user: 'John Doe' },
    { id: 2, filename: 'product_catalog.xlsx', rows: 3420, status: 'success', date: '2024-01-14 03:15 PM', user: 'Jane Smith' },
    { id: 3, filename: 'inventory_data.json', rows: 890, status: 'failed', date: '2024-01-13 11:45 AM', user: 'Mike Johnson' },
    { id: 4, filename: 'sales_report.csv', rows: 2450, status: 'processing', date: '2024-01-12 09:20 AM', user: 'Sarah Williams' }
  ];

  const exports = [
    { id: 1, filename: 'sales_report_q4.csv', rows: 845, status: 'success', date: '2024-01-15 02:30 PM', format: 'CSV' },
    { id: 2, filename: 'customer_export.json', rows: 1250, status: 'success', date: '2024-01-14 11:20 AM', format: 'JSON' },
    { id: 3, filename: 'inventory_report.xlsx', rows: 3420, status: 'failed', date: '2024-01-13 04:45 PM', format: 'Excel' },
    { id: 4, filename: 'annual_report.pdf', rows: 5000, status: 'processing', date: '2024-01-12 10:15 AM', format: 'PDF' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black flex items-center gap-3">
            <History className="w-8 h-8" />
            Activity History
          </h1>
          <p className="text-black/80 mt-1">View all your import and export activities</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/10 backdrop-blur rounded-xl text-black hover:bg-white/20 transition-all">
            <Download className="w-4 h-4" /> Export Logs
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('imports')}
            className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
              activeTab === 'imports' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📥 Import History
          </button>
          <button
            onClick={() => setActiveTab('exports')}
            className={`flex-1 px-6 py-3 text-center font-medium transition-all ${
              activeTab === 'exports' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📤 Export History
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Filename</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Records</th>
                {activeTab === 'exports' && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Format</th>}
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(activeTab === 'imports' ? imports : exports).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{item.filename}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{item.rows.toLocaleString()}</span>
                  </td>
                  {activeTab === 'exports' && (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{item.format}</span>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.user || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'success' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" /> Success
                      </span>
                    )}
                    {item.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                        <XCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                    {item.status === 'processing' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                        <Clock className="w-3 h-3 animate-spin" /> Processing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;