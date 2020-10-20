import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider as Styledtheme } from "styled-components";
import { theme } from "theme";
import { ThemeProvider } from "theme-ui";
import { useApollo } from "../apollo";
import "style/index.scss";

Router.events.on("routeChangeStart", () => {
  // console.log("From nprogress", url);
  Nprogress.start();
});
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());
const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.apollo);

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="/nprogress.css" />
      </Head>
      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Styledtheme theme={theme}>
              <Component {...pageProps} />
            </Styledtheme>
          </ThemeProvider>
        </ApolloProvider>
      </RecoilRoot>
    </Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
