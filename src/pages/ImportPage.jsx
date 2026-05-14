import React, { useState } from 'react';
import { 
  Upload, FileText, Database, CheckCircle, 
  AlertCircle, TrendingUp, Clock, ArrowRight,
  Cloud, Shield, Zap, Users
} from 'lucide-react';
import Button from '../components/common/Button';
import ImportWizard from '../components/import/ImportWizard';

const ImportPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  
  const features = [
    { icon: Cloud, title: 'Cloud Ready', desc: 'Import from any cloud storage' },
    { icon: Shield, title: 'Secure', desc: '256-bit encryption' },
    { icon: Zap, title: 'Fast Processing', desc: 'Up to 100k rows/sec' },
    { icon: Users, title: 'Team Collaboration', desc: 'Share imports with team' }
  ];

  const stats = [
    { label: 'Total Imports', value: '2,847', change: '+12%', icon: TrendingUp },
    { label: 'Success Rate', value: '98.5%', change: '+2.1%', icon: CheckCircle },
    { label: 'Avg Processing', value: '2.4s', change: '-0.3s', icon: Clock }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Import Data</h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mb-6">
            Seamlessly import your data from CSV, JSON, Excel files with AI-powered validation and smart mapping
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all group"
          >
            Start New Import
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
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-purple-600" />
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

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-purple-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Imports Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Recent Imports
              </h3>
              <p className="text-sm text-gray-500 mt-1">Your latest import activities</p>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All →</button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">customer_data_{item}.csv</p>
                    <p className="text-xs text-gray-500">2,450 rows • Imported 2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Wizard Modal */}
      {showWizard && (
        <ImportWizard
          onClose={() => setShowWizard(false)}
          onComplete={(data) => {
            console.log('Import completed:', data);
            setShowWizard(false);
          }}
        />
      )}
    </div>
  );
};

export default ImportPage;