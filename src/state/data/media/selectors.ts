import { createSelector } from "@reduxjs/toolkit";

import { MediaState } from "types/media";
import type RootState from "types/rootState";

export const selectSlice = (state: RootState): MediaState => state.data.media;

export const makeSelectMedias = () =>
  createSelector(selectSlice, (slice) => slice);
