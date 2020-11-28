import { CommonAsyncState, CommonState } from "types/state";

import { PaginateCriteria } from "./criteria";

export interface MediaCriteria extends PaginateCriteria {
  name?: string;
}

export type MediaFile = {
  author: string;
  extension: string;
  file?: File;
  id?: string;
  name: string;
  size: number;
  thumbnail?: string;
  uploadTime: number;
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
