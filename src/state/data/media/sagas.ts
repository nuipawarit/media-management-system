import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { MediaCriteria, MediaFile, MediaState } from "types/media";

import { selectSlice } from "./selectors";
import * as mediaService from "./services";
import * as actions from "./slice";

export function* get(action: { payload?: Partial<MediaCriteria> }) {
  try {
    const state: MediaState = yield select(selectSlice);

    let { criteria } = state.data;

    if (action.payload) {
      criteria = {
        ...state.data.criteria,
        ...action.payload,
      };
    }

    const params = {
      count: criteria.count,
      name: criteria.name || undefined,
      page: criteria.page,
    };

    yield put(actions.getPending());

    const serviceResponse = yield call(mediaService.get, params);
    const serviceResult = serviceResponse.data.result;
    const result = [...(state.data.result ?? []), ...serviceResult];
    const hasMore = !serviceResponse.data.paging.last;

    const data = {
      ...state.data,
      criteria,
      hasMore,
      result,
    };

    yield put(actions.getSucceeded(data));
  } catch (error) {
    yield put(actions.getFailed(error));
  }
}

export function* add(action: { payload: MediaFile[] }) {
  try {
    const state: MediaState = yield select(selectSlice);

    if (state.data.result === null) return;

    yield put(actions.addPending());

    // Create new media
    const serviceResponse = yield call(mediaService.add, action.payload);

    const serviceResult = serviceResponse.data.result;
    const result = [...serviceResult, ...state.data.result];

    const data = {
      ...state.data,
      result,
    };

    yield put(actions.addSucceeded(data));
  } catch (error) {
    yield put(actions.addFailed(error));
  }
}

export function* update(action: { payload: MediaFile }) {
  try {
    const state: MediaState = yield select(selectSlice);

    if (state.data.result === null) return;

    const mediaId = action.payload.id || "";

    yield put(actions.updatePending());

    // Update media
    const serviceResponse = yield call(
      mediaService.update,
      mediaId,
      action.payload
    );
    const serviceResult = serviceResponse.data.result;

    const result = state.data.result.map((item) => {
      if (item.id === serviceResult.id) {
        return serviceResult;
      }

      return item;
    });

    const data = {
      ...state.data,
      result,
    };

    yield put(actions.updateSucceeded(data));
  } catch (error) {
    console.log(error);
    yield put(actions.updateFailed(error));
  }
}

export function* remove(action: { payload: MediaFile }) {
  try {
    const state: MediaState = yield select(selectSlice);

    if (state.data.result === null) return;

    const mediaId = action.payload.id || "";

    yield put(actions.removePending());

    // Update media
    const serviceResponse = yield call(mediaService.remove, mediaId);
    const serviceResult = serviceResponse.data.result;

    const result = state.data.result.filter((item) => {
      return item.id !== serviceResult.id;
    });

    const data = {
      ...state.data,
      result,
    };

    yield put(actions.removeSucceeded(data));
  } catch (error) {
    yield put(actions.removeFailed(error));
  }
}

export function* watcher() {
  yield all([
    takeLatest(actions.get, get),
    takeLatest(actions.add, add),
    takeLatest(actions.update, update),
    takeLatest(actions.remove, remove),
  ]);
}

export default watcher;
