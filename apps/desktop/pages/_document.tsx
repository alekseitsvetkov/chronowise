import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div data-tauri-drag-region className="titlebar">
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-minimize">
            <img src="https://api.iconify.design/mdi:window-minimize.svg?color=gray" alt="minimize" />
          </div>
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-maximize">
            <img src="https://api.iconify.design/mdi:window-maximize.svg?color=gray" alt="maximize" />
          </div>
          <div className="titlebar-button titlebar-button--close hover:cursor-pointer" id="titlebar-close">
            <img src="https://api.iconify.design/mdi:close.svg?color=white" alt="close" />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}