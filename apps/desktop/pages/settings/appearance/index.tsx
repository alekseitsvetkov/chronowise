"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SettingsLayout } from '@/components'

export default function Home() {
  const router = useRouter()
  const [tauriWindow, setTauriWindow] = useState<any>();

  async function setupAppWindow() {
		const tauriWindow = (await import('@tauri-apps/api/window'));
		setTauriWindow({appWindow: tauriWindow.appWindow, LogicalSize: tauriWindow.LogicalSize});
	}

  useEffect(() => {
    setupAppWindow();
  }, [])

  useEffect(() => {
    tauriWindow && tauriWindow.appWindow.setSize(new tauriWindow.LogicalSize(600, 500));
  }, [tauriWindow])

  return (
    <SettingsLayout>
      <div>settings/appearance</div>
    </SettingsLayout>
  );
}
