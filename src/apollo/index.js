import { useMemo } from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import Cookie from "js-cookie";

let apolloClient;
let token = Cookie.get("token");

const link = createHttpLink({
  uri: "/graphql",
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache,
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: token,
        },
      });
    },
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) _apolloClient.cache.restore(initialState);
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
