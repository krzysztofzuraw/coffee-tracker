import { AppProps } from 'next/app';
import React from 'react';

import '../styles/reset.css';
import '../styles/global.css';
import { init } from '../helpers/sentry';
import { NextPageContext } from 'next';

init();

export default function App({
  Component,
  pageProps,
  err,
}: AppProps & { err: NextPageContext['err'] }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <Component {...pageProps} err={err} />;
}
