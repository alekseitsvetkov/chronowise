// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere
import { PropsWithChildren, createContext, useContext } from 'react';
import type { PageContextBuiltIn } from 'vite-plugin-ssr';

export { PageContextProvider };
export { usePageContext };

const Context = createContext<PageContextBuiltIn>(undefined as any);

function PageContextProvider({
	pageContext,
	children
}: PropsWithChildren<{
	pageContext: PageContextBuiltIn;
}>) {
	return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
	const pageContext = useContext(Context);
	return pageContext;
}