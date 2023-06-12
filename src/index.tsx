import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './assets/styles/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
