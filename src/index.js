import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AppProvider } from './contexts/AppContext';
import { ImportProvider } from './contexts/ImportContext';
import { ExportProvider } from './contexts/ExportContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ImportProvider>
          <ExportProvider>
            <App />
          </ExportProvider>
        </ImportProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();