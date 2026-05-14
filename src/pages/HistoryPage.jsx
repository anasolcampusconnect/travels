import React from 'react';
import Card from '../components/common/Card';

const HistoryPage = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">History</h1>
        <p className="text-white/80">View all your import and export activities</p>
      </div>
      
      <div className="space-y-6">
        <Card title="Import History" icon="📥">
          <div className="text-center text-gray-500 py-8">
            No import history yet
          </div>
        </Card>
        
        <Card title="Export History" icon="📤">
          <div className="text-center text-gray-500 py-8">
            No export history yet
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HistoryPage;