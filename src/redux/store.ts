/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable global-require */
import createSagaMiddleware from 'redux-saga';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// import { handleError } from './helpers';
import rootReducer from './reducer';
import rootSaga from './saga';

// Global Redux Saga error handler
export const catchError = (httpResponse: any) => {
  // TODO: Remove debugging logs
  // console.log('Global Redux Saga error:', httpResponse);
  // TODO: Alternative global error handling solution
  // handleError(store);
};

// Initialize middleware
const sagaMiddleware = createSagaMiddleware({
  onError(error: any) {
    catchError(error);
  },
});

// Create Redux store instance
const store = configureStore({
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  reducer: rootReducer,
});

// Run Saga middleware
sagaMiddleware.run(rootSaga);

// Hot-reloading the root reducer, we can re-import the new version of the root
// reducer function whenever it's been recompiled, and tell the store to use the
// new version instead.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(require('./reducer').default);
  });
}

export default store;
