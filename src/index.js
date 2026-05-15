// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AppProvider } from './contexts/AppContext';
import { ImportProvider } from './contexts/ImportContext';
import { ExportProvider } from './contexts/ExportContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <ImportProvider>
          <ExportProvider>
            <App />
          </ExportProvider>
        </ImportProvider>
      </AppProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();