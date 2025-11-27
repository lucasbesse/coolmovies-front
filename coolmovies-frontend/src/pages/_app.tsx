import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { FC, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
import { createStore } from '../state';
import { EnhancedStore } from '@reduxjs/toolkit';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from '../features/example/components/Header/Header';
import LoadingOverlay from '../features/example/components/Loading/LoadingOverlay';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [store, setStore] = useState<EnhancedStore | null>(null);
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3d59a0ff',
      },
      secondary: {
        main: '#8ca5e2ff',
        light: '#cae4ffff',
      },
    },
  });

  React.useEffect(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    });

    const store = createStore({ epicDependencies: { client } });
    setStore(store);
    setClient(client);
  }, []);
  if (!store || !client) return <>{'Loading...'}</>;
  return (
    <>
      <Head>
        <title>{'Coolmovies Frontend'}</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Header />
            <LoadingOverlay />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
