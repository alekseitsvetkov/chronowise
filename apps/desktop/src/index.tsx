import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
import '@chronosphere/ui/style/style.scss';
import '@fontsource/inter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
