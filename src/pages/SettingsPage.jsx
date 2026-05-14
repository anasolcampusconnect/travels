import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    maxFileSize: 10,
    defaultFormat: 'csv',
    autoSave: true,
    theme: 'light'
  });
  
  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/80">Configure your import/export preferences</p>
      </div>
      
      <Card title="General Settings" icon="⚙️">
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum File Size (MB)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={settings.maxFileSize}
              onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Export Format</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={settings.defaultFormat}
              onChange={(e) => setSettings({...settings, defaultFormat: e.target.value})}
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600"
                checked={settings.autoSave}
                onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
              />
              <span className="text-sm text-gray-700">Auto-save settings</span>
            </label>
          </div>
          
          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;