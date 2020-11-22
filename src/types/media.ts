import { CommonAsyncState, CommonState } from "types/state";

import { PaginateCriteria } from "./criteria";

export interface MediaCriteria extends PaginateCriteria {
  name?: string;
}

export type MediaFile = {
  id: string;
  // name: string;
  // status: boolean;
};

export interface MediaState extends CommonState {
  data: {
    criteria: MediaCriteria;
    hasMore: boolean;
    result: MediaFile[] | null;
  };
  status: {
    add: CommonAsyncState;
    get: CommonAsyncState;
    remove: CommonAsyncState;
    update: CommonAsyncState;
  };
}
