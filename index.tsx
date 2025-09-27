// FIX: Import React before types.ts to ensure the global JSX namespace is available for augmentation. This resolves errors with custom elements like 'iconify-icon'.
import React from 'react';
import './types';
import ReactDOM from 'react-dom/client';
import App from './App';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);