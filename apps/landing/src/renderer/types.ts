export type PageProps = Record<string, unknown>;
// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
	Page: (pageProps: PageProps) => React.ReactElement;
	pageProps: PageProps;
	documentProps?: {
		title?: string;
		description?: string;
	};
};