import React, { PropsWithChildren } from 'react';
import { PageContextBuiltIn } from 'vite-plugin-ssr';
import '@chronowise/ui/style';
import { PageContextProvider } from './renderer/usePageContext';
import './style.scss';

export default function App({
	children,
	pageContext
}: PropsWithChildren<{
	pageContext: PageContextBuiltIn;
}>) {
	return (
		<React.StrictMode>
			<PageContextProvider pageContext={pageContext}>
				<>
					<div className="z-10 m-auto max-w-[100rem] bg-white text-black dark:bg-black dark:text-white">
						{children}
					</div>
				</>
			</PageContextProvider>
		</React.StrictMode>
	);
}