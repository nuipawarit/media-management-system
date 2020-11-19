import configureStore from 'redux-mock-store';

import { Middleware } from '@reduxjs/toolkit';

export function mockStore(
  preloadedState: any,
  middlewares: Middleware[] = [],
) {
  const state = preloadedState || {};
  const createStore = configureStore(middlewares);

  return createStore(state);
}

export const mockState = {
  router: {
    location: {
      hash: '',
      key: '',
      pathname: '/',
      search: '',
      state: undefined,
    },
  },
};
