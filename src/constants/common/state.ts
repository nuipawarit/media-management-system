import { CommonAsyncState, CommonState } from "types/state";

export const commonAsyncState: CommonAsyncState = {
  error: null,
  loaded: false,
  loading: false,
};

export const commonState: CommonState = {
  data: null,
  status: {},
};
