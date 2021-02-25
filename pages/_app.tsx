import ProgressBar from '@badrap/bar-of-progress'
import { AppProps } from 'next/app'
import Router from 'next/router'
import '../styles.css'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism.css'
import 'katex/dist/katex.min.css'

const progress = new ProgressBar({
  size: 2,
  color: '#2563eb',
  className: 'bar-of-progress',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
