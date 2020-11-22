import { combineReducers } from "@reduxjs/toolkit";

import mediaSagas from "./media/sagas";
import mediaSlice from "./media/slice";

// Sagas
const dataSagas = {
  mediaSagas,
};

// Slice
const dataSlice = combineReducers({
  media: mediaSlice,
});

export { dataSagas, dataSlice };
