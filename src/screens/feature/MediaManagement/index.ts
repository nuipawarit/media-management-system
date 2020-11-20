import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { makeSelectMedias } from "state/data/media/selectors";
import { clearResult, get, reset } from "state/data/media/slice";
import type RootState from "types/rootState";
import View from "./MediaManagement";

const mapState = () => (state: RootState) => {
  const selectMedias = makeSelectMedias();
  const {
    data: {
      criteria: { page },
      hasMore,
      result,
    },
    status: {
      get: { loading },
    },
  } = selectMedias(state);

  return {
    media: result,
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
