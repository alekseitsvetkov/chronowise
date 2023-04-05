"use client"

import { App } from '@/components';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Chronowise',
  description: 'Chronowise is a better way to improve your workflow. Meet the new way to increase productivity and reduce stress.',
}

export default function Home() {
  const [tauriWindow, setTauriWindow] = useState<any>();

  async function setupAppWindow() {
		const tauriWindow = (await import('@tauri-apps/api/window'));
		setTauriWindow({appWindow: tauriWindow.appWindow, LogicalSize: tauriWindow.LogicalSize});
	}

  useEffect(() => {
    setupAppWindow();
  }, [])

  useEffect(() => {
    tauriWindow && tauriWindow.appWindow.setSize(new tauriWindow.LogicalSize(300, 240));
  }, [tauriWindow])
  
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}
