import { combineReducers } from "@reduxjs/toolkit";
import { dataSagas, dataSlice } from "./data";

// Sagas
const sagas = {
  ...dataSagas,
};

// Slice
const slice = combineReducers({
  data: dataSlice,
});

export { sagas, slice };
