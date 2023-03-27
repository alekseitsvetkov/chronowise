import { hydrateRoot } from 'react-dom/client';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';
import App from '../App';
import type { PageContext } from './types';

export { render };

// Enable Client Routing
export const clientRouting = true;

// See `Link prefetching` section below. Default value: `{ when: 'HOVER' }`.
export const prefetchStaticAssets = { when: 'HOVER' };

// Whether your UI framework allows the hydration to be aborted. (Allowing vite-plugin-ssr
// to abort the hydration if the user clicks on a link before the hydration finished.)
// Only React users should set `hydrationCanBeAborted` to `true`. (Other frameworks,
// such as Vue, throw an error if the hydration is aborted.)
export const hydrationCanBeAborted = true

async function render(pageContext: PageContextBuiltInClient & PageContext) {
	const { Page, pageProps } = pageContext;
	hydrateRoot(
		document.getElementById('page-view')!,
		<App pageContext={pageContext as any}>
			<Page {...pageProps} />
		</App>
	);
}