import React, { PropsWithChildren } from 'react';
import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import '@chronowise/ui/style';
import { PageContextProvider } from './renderer/usePageContext';
import './style.scss';
import { Header, ThemeProvider } from './components';

export default function App({
	children,
	pageContext
}: PropsWithChildren<{
	pageContext: PageContextBuiltIn;
}>) {
	return (
		<React.StrictMode>
			<PageContextProvider pageContext={pageContext}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="bg-white text-black dark:bg-black dark:text-white">
						<Header />
						<div className="z-10 m-auto max-w-[100rem]">
							{children}
						</div>
						{/* <Footer /> */}
					</div>
				</ThemeProvider>
			</PageContextProvider>
		</React.StrictMode>
	);
}