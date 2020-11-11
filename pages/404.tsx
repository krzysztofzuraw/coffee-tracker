import Error from 'next/error';
import React from 'react';

export default function NotFound() {
  // Do not record an exception in Sentry for 404
  return <Error statusCode={404} />;
}
