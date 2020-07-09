import { ApolloProvider } from "@apollo/react-hooks";
import { AUTH } from "apollo/queries";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { ThemeProvider as Styledtheme } from "styled-components";
import { theme } from "theme";
import { ThemeProvider } from "theme-ui";
import { initializeApollo, useApollo } from "../apollo";
import { initializeStore, useStore } from "../redux";
import cookies from "next-cookies";

Router.events.on("routeChangeStart", () => {
  // console.log("From nprogress", url);
  Nprogress.start();
});
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());
const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.store);
  const apolloClient = useApollo(pageProps.apollo);
  // const user = pageProps.user;
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/nprogress.css" />
      </Head>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Styledtheme theme={theme}>
              <Component {...pageProps} />
            </Styledtheme>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </Fragment>
  );
};

MyApp.getInitialProps = async (appctx) => {
  let { ctx } = appctx;
  const reduxStore = initializeStore();
  let apolloClient = initializeApollo();

  let token;
  let user;

  const pageProps = await App.getInitialProps(appctx);

  const accessToken = cookies(ctx) || null;
  if (accessToken.token) {
    token = accessToken.token;
    apolloClient = initializeApollo(null, token);

    try {
      const { data } = await apolloClient.query({
        query: AUTH,
      });
      if (data) {
        user = data.auth;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    pageProps: {
      ...pageProps,
      store: reduxStore.getState(),
      apollo: apolloClient.cache.extract(),
      user,
    },
  };
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
