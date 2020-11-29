import { connect } from "react-redux";

import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";

import { makeSelectMedia } from "state/data/media/selectors";
import { clearResult, get, reset } from "state/data/media/slice";
import type RootState from "types/rootState";

import View from "./MediaManagement";

const mapState = () => (state: RootState) => {
  const selectMedia = makeSelectMedia();

  const {
    data: {
      criteria: { page },
      hasMore,
      result,
    },
    status: {
      get: { loading },
    },
  } = selectMedia(state);

  return {
    data: result,
    hasMore,
    loading,
    page,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  ...bindActionCreators(
    {
      clearResult,
      load: get,
      reset,
    },
    dispatch
  ),
});

export default connect(mapState, mapDispatch)(View);
