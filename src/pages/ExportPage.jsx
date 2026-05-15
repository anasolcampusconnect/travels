import React, { useState } from 'react';
import { 
  Download, FileJson, FileSpreadsheet, FileText,
  TrendingDown, CheckCircle, Clock, ArrowRight,
  Globe, Lock, Send, BarChart3
} from 'lucide-react';
import ExportWizard from '../components/export/ExportWizard';

const ExportPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  
  const formats = [
    { icon: FileJson, name: 'JSON', ext: '.json', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-100' },
    { icon: FileSpreadsheet, name: 'Excel', ext: '.xlsx', color: 'from-green-500 to-emerald-500', bg: 'bg-green-100' },
    { icon: FileText, name: 'PDF', ext: '.pdf', color: 'from-red-500 to-rose-500', bg: 'bg-red-100' },
    { icon: FileText, name: 'CSV', ext: '.csv', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100' }
  ];

  const stats = [
    { label: 'Total Exports', value: '1,943', change: '+8.2%', icon: TrendingDown },
    { label: 'Formats Supported', value: '4', change: '+1', icon: CheckCircle },
    { label: 'Avg Export Time', value: '1.8s', change: '-0.5s', icon: Clock }
  ];

  const features = [
    { icon: Globe, title: 'Multi-Format', desc: 'Export to CSV, JSON, Excel, PDF' },
    { icon: Lock, title: 'Secure Export', desc: 'End-to-end encryption' },
    { icon: Send, title: 'Auto-Delivery', desc: 'Send to email/cloud' },
    { icon: BarChart3, title: 'Analytics', desc: 'Export with insights' }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Export Data</h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mb-6">
            Export your data in multiple formats with custom filters, field selection, and automated scheduling
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all group"
          >
            New Export
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <span className={`text-sm font-semibold ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-green-600" />
          Supported Export Formats
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formats.map((format, idx) => {
            const Icon = format.icon;
            return (
              <div key={idx} className="group cursor-pointer">
                <div className={`${format.bg} rounded-xl p-4 text-center transition-all group-hover:scale-105 group-hover:shadow-lg`}>
                  <Icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                  <p className="font-semibold text-gray-800">{format.name}</p>
                  <p className="text-xs text-gray-500">{format.ext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Exports */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                Recent Exports
              </h3>
              <p className="text-sm text-gray-500 mt-1">Your latest export activities</p>
            </div>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">View All →</button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">sales_report_{item}.csv</p>
                    <p className="text-xs text-gray-500">1,280 records • Exported 1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">Completed</span>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Wizard Modal */}
      {showWizard && (
        <ExportWizard
          data={{ headers: ['id', 'name', 'email', 'phone'], rows: [] }}
          onClose={() => setShowWizard(false)}
          onComplete={(data) => {
            console.log('Export completed:', data);
            setShowWizard(false);
          }}
        />
      )}
    </div>
  );
};

export default ExportPage;