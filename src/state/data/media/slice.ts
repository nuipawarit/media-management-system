import { createSlice } from "@reduxjs/toolkit";

import PAGINATION from "config/app/pagination";
import { commonAsyncState, commonState } from "constants/common/state";
import { generateCommonAsyncReducer } from "helpers/state";
import { MediaCriteria, MediaFile, MediaState } from "types/media";

export const initialState: MediaState = {
  ...commonState,
  data: {
    criteria: {
      count: PAGINATION.default.count,
      page: 0,
    },
    hasMore: true,
    result: null,
  },
  status: {
    add: commonAsyncState,
    get: commonAsyncState,
    remove: commonAsyncState,
    update: commonAsyncState,
  },
};

const asyncReducer = {
  add: generateCommonAsyncReducer<MediaState, MediaFile[]>(initialState, "add"),
  get: generateCommonAsyncReducer<
    MediaState,
    Partial<MediaCriteria> | undefined
  >(initialState, "get"),
  remove: generateCommonAsyncReducer<MediaState, MediaFile>(
    initialState,
    "remove"
  ),
  update: generateCommonAsyncReducer<MediaState, MediaFile>(
    initialState,
    "update"
  ),
};

const slice = createSlice({
  initialState,
  name: "data/media",
  reducers: {
    add: asyncReducer.add.default,
    addFailed: asyncReducer.add.failed,
    addPending: asyncReducer.add.pending,
    addSucceeded: asyncReducer.add.succeeded,

    clearResult: (state) => ({
      data: {
        ...initialState.data,
        criteria: {
          ...state.data.criteria,
          page: 0,
        },
        hasMore: true,
      },
      status: { ...initialState.status },
    }),

    get: asyncReducer.get.default,
    getFailed: asyncReducer.get.failed,
    getPending: asyncReducer.get.pending,
    getSucceeded: asyncReducer.get.succeeded,

    remove: asyncReducer.remove.default,
    removeFailed: asyncReducer.remove.failed,
    removePending: asyncReducer.remove.pending,
    removeSucceeded: asyncReducer.remove.succeeded,

    reset: () => ({ ...initialState }),

    update: asyncReducer.update.default,
    updateFailed: asyncReducer.update.failed,
    updatePending: asyncReducer.update.pending,
    updateSucceeded: asyncReducer.update.succeeded,
  },
});

export const {
  add,
  addFailed,
  addPending,
  addSucceeded,
  clearResult,
  get,
  getFailed,
  getPending,
  getSucceeded,
  remove,
  removeFailed,
  removePending,
  removeSucceeded,
  reset,
  update,
  updateFailed,
  updatePending,
  updateSucceeded,
} = slice.actions;

export default slice.reducer;
