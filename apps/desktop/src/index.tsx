import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
import { appWindow } from '@tauri-apps/api/window'
import '@chronosphere/ui/style/style.scss';
import '@fontsource/inter';

// @ts-ignore
document
  .getElementById('titlebar-minimize')
  .addEventListener('click', () => appWindow.minimize())
// @ts-ignore
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
