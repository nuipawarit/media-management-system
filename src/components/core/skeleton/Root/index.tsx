import React, { FC } from "react";
import { Provider } from "react-redux";

import store from "redux/store";

import App from "../App";

const Root: FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
