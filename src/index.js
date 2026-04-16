import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// FAKE MAP - No Google API needed!
window.google = window.google || {
  maps: {
    Map: class FakeMap {
      constructor(element, options) {
        element.innerHTML = `
          <div style="height:100%;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);position:relative">
            <div style="position:absolute;top:20%;left:20%;width:60px;height:60px;background:#1e40af;border-radius:50%;animation:pulse 2s infinite"></div>
            <div style="position:absolute;bottom:20px;left:20px;color:white;background:rgba(0,0,0,0.7);padding:8px;border-radius:20px;font-size:12px">
              🟢 Low crowd | 🟡 Medium | 🔴 High
            </div>
            <style>
              @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
            </style>
          </div>
        `;
      }
    },
    visualization: {
      HeatmapLayer: class FakeHeatmap {}
    },
    LatLng: class {},
    SymbolPath: { CIRCLE: 'circle' }
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
