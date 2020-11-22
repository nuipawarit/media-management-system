import { all, fork } from "redux-saga/effects";

import { mapValues } from "lodash";

import { sagas } from "state";

// Configure root saga
function* root() {
  yield all(mapValues(sagas, fork));
}

export default root;
