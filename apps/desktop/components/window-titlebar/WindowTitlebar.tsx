import { useEffect, useState } from 'react'
import Image from 'next/image'


export function WindowTitlebar() {
  const [appWindow, setAppWindow] = useState<any>()

  async function setupAppWindow() {
    const appWindow = (await import('@tauri-apps/api/window')).appWindow
    setAppWindow(appWindow)
  }

  useEffect(() => {
    setupAppWindow()
  }, []) 

  function windowMinimize() {
    appWindow?.minimize()
  }
  // function windowToggleMaximize() {
  //   appWindow?.toggleMaximize()
  // }
  // function windowClose() {
  //   appWindow?.close()
  // }
  function windowHide() {
    appWindow?.hide()
  }

  return (
    <>
      <div data-tauri-drag-region className="titlebar">
          <div onClick={windowMinimize} className="titlebar-button hover:cursor-pointer" id="titlebar-minimize">
            <Image src="https://api.iconify.design/mdi:window-minimize.svgcolor=white" alt="minimize" />
          </div>
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-maximize">
            <Image src="https://api.iconify.design/mdi:window-maximize.svg?color=gray" alt="maximize" />
          </div>
          <div onClick={windowHide} className="titlebar-button titlebar-button--close hover:cursor-pointer" id="titlebar-close">
            <Image src="https://api.iconify.design/mdi:close.svg?color=white" alt="close" />
          </div>
        </div>
    </>
  )
}