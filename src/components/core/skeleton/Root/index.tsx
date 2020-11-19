import React, { FC } from "react";
import { Provider } from "react-redux";

import { Store } from "@reduxjs/toolkit";

import App from "../App";

type Props = {
  store: Store;
};

const Root: FC<Props> = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
