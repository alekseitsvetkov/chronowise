import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export function WindowTitlebar() {
	const [appWindow, setAppWindow] = useState<any>();
	const [os, setOs] = useState<any>();
	const [isMacOS, setIsMacOS] = useState<boolean>(false);

	function windowMinimize() {
		appWindow?.minimize();
	}
	// function windowToggleMaximize() {
	//   appWindow?.toggleMaximize()
	// }
	// function windowClose() {
	//   appWindow?.close()
	// }
	function windowHide() {
		appWindow?.hide();
	}

	async function setupAppWindow() {
		const appWindow = (await import('@tauri-apps/api/window')).appWindow;
		setAppWindow(appWindow);
	}

	const setupPlatform = useCallback(async () => {
		const os = await import('@tauri-apps/api/os');
		setOs(os);
	}, []);

	useEffect(() => {
		setupAppWindow();
		setupPlatform();
	}, [setupPlatform]);

	useEffect(() => {

		async function checkOS() {
			const platform = os && (await os.platform());

			if (platform === 'darwin') {
				setIsMacOS(true);
			}
		}

		checkOS();
	}, [os]);

	return (
		<div data-tauri-drag-region className="titlebar bg-gray-800 border-b border-gray-600">
			{!isMacOS && (
				<>
					<div
						onClick={windowMinimize}
						className="titlebar-button hover:cursor-pointer"
						id="titlebar-minimize"
					>
						<Image
							src="https://api.iconify.design/mdi:window-minimize.svg?color=white"
							alt="minimize"
							width="16"
							height="16"
						/>
					</div>
					<div className="titlebar-button hover:cursor-pointer" id="titlebar-maximize">
						<Image
							src="https://api.iconify.design/mdi:window-maximize.svg?color=gray"
							alt="maximize"
							width="16"
							height="16"
						/>
					</div>
					<div
						onClick={windowHide}
						className="titlebar-button titlebar-button--close hover:cursor-pointer"
						id="titlebar-close"
					>
						<Image
							src="https://api.iconify.design/mdi:close.svg?color=white"
							alt="close"
							width="16"
							height="16"
						/>
					</div>
				</>
			)}
		</div>
	);
}
