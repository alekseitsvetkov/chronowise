import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
import { appWindow } from '@tauri-apps/api/window'
import '@chronowise/ui/style/style.scss';
import '@fontsource/inter';

document
  ?.getElementById('titlebar-close')
  ?.addEventListener('click', () => appWindow.hide())
  
document.addEventListener('contextmenu', event => event.preventDefault());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
