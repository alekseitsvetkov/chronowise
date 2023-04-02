import { Html, Head, Main, NextScript } from 'next/document'
import Image from 'next/image'
import { appWindow } from '@tauri-apps/api/window'

export default function Document() {
  document?.getElementById('titlebar-close')?.addEventListener('click', () => appWindow.hide())

  document.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <Html lang="en">
      <Head />
      <body>
        <div data-tauri-drag-region className="titlebar">
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-minimize">
            <Image src="https://api.iconify.design/mdi:window-minimize.svg?color=gray" alt="minimize" />
          </div>
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-maximize">
            <Image src="https://api.iconify.design/mdi:window-maximize.svg?color=gray" alt="maximize" />
          </div>
          <div className="titlebar-button titlebar-button--close hover:cursor-pointer" id="titlebar-close">
            <Image src="https://api.iconify.design/mdi:close.svg?color=white" alt="close" />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}