import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
    // headers: new Headers({'content-type': 'application/json'}),
    // mode: 'cors',
    // cache: "no-cache",
    // referrerPolicy: "strict-origin-when-cross-origin"
  }
});
import theme from '../theme';

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;