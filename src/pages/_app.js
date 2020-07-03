import React, { Fragment } from "react";
import App from "next/app";
import PropTypes from "prop-types";
import Head from "next/head";
import Nprogress from "nprogress";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { initializeStore, useStore } from "../redux";
import { initializeApollo, useApollo } from "../apollo";
import { ThemeProvider } from "theme-ui";
import { AUTH } from "apollo/queries";
import Cookie from "js-cookie";
import Router from "next/router";
import { ThemeProvider as Styledtheme } from "styled-components";

import { theme } from "theme";

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
  const apolloClient = initializeApollo();
  let token;
  let user;
  const pageProps = await App.getInitialProps(appctx);
  if (ctx.req && ctx.req.cookies) {
    token = ctx.req.cookies.token;
  } else {
    token = Cookie.get("token");
  }
  if (token) {
    // SetToken(token);
    try {
      // const { data } = await axios.get("/me");
      const { data } = await apolloClient.query({
        query: AUTH,
        // variables: { token },
      });

      user = data;
      // console.log("From _app:", data);
    } catch (error) {
      console.log(error);
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
