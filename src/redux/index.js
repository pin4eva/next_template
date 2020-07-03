import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { combineReducers } from "redux";
import user, { userState } from "./reducers/userReducer";

let store;

const initialState = {
  user: userState,
};

const reducer = combineReducers({ user });

export const initStore = (preloadedState = initialState) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
