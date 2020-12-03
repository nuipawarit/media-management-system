import { connect } from "react-redux";

import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";

import { makeSelectMedia } from "state/data/media/selectors";
import { add, remove, update } from "state/data/media/slice";
import type RootState from "types/rootState";

import View from "./MediaDialog";

const mapState = () => (state: RootState) => {
  const selectMedia = makeSelectMedia();
  const { status } = selectMedia(state);

  return { status };
};

const mapDispatch = (dispatch: Dispatch) => ({
  ...bindActionCreators(
    {
      add,
      remove,
      update,
    },
    dispatch
  ),
});

export default connect(mapState, mapDispatch)(View);
