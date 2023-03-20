import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
import { appWindow } from '@tauri-apps/api/window'
import '@chronosphere/ui/style/style.scss';
import '@fontsource/inter';

document
  ?.getElementById('titlebar-close')
  ?.addEventListener('click', () => appWindow.hide())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
