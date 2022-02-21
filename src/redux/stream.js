import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import apis from "../api/api";

const GET_STREALIST = "/stream/GET_STREAMLIST";

export const getStreamList = createAction(GET_STREALIST, (streamList) => ({
  streamList,
}));

const initialState = {
  streamList: null,
};

export const getStreamListFB = () => {
  return async (dispatch, getState) => {
    console.log("2");
    try {
      console.log("왔니?");
      const response = await apis.get(`/stream/6`);
      console.log(response.data);
      const streamList = response.data;
      dispatch(getStreamList(streamList));
    } catch (e) {
      console.log(e);
    }
  };
};

const stream = handleActions(
  {
    [GET_STREALIST]: (state, action) =>
      produce(state, (draft) => (draft.streamList = action.payload.streamList)),
  },
  initialState
);

export default stream;
