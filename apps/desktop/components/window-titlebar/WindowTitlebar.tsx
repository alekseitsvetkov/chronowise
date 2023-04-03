import { useEffect, useState } from 'react'
import Image from 'next/image'

export function WindowTitlebar() {
  const [appWindow, setAppWindow] = useState<any>()
  const [platform, setPlatform] = useState<any>()
  const [isMacOS, setIsMacOS] = useState<boolean>(false)

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

  async function setupAppWindow() {
    const appWindow = (await import('@tauri-apps/api/window')).appWindow
    setAppWindow(appWindow)
  }

  async function setupPlatform() {
    const {platform} = (await import('@tauri-apps/api/os'))
    setPlatform(platform)
  }

  useEffect(() => {
    setupAppWindow()
    setupPlatform()
  }, []) 

  useEffect(() => {
    async function checkOS() {
      if (platform === 'darwin') {
        setIsMacOS(true)
      }
    }
    checkOS()
  }, [])

  return (
    <>
      {!isMacOS && (
        <div data-tauri-drag-region className="titlebar bg-transparent">
          <div onClick={windowMinimize} className="titlebar-button hover:cursor-pointer" id="titlebar-minimize">
            <Image src="https://api.iconify.design/mdi:window-minimize.svg?color=white" alt="minimize" />
          </div>
          <div className="titlebar-button hover:cursor-pointer" id="titlebar-maximize">
            <Image src="https://api.iconify.design/mdi:window-maximize.svg?color=gray" alt="maximize" />
          </div>
          <div onClick={windowHide} className="titlebar-button titlebar-button--close hover:cursor-pointer" id="titlebar-close">
            <Image src="https://api.iconify.design/mdi:close.svg?color=white" alt="close" />
          </div>
        </div>
      )}
    </>
  )
}