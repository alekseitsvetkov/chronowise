import type { AppProps } from 'next/app'
import '@chronowise/ui/style';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
