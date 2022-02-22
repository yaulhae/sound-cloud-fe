import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import apis from "../api/api";

const GET_STREALIST = "/stream/GET_STREAMLIST";

export const getStreamList = createAction(GET_STREALIST, (streamList) => ({
  streamList,
}));

export const getStreamListFB = () => {
  return async (dispatch, getState) => {
    try {
      const response = await apis.get(`/stream/12`);
      const streamList = response.data;
      dispatch(getStreamList(streamList));
    } catch (e) {
      console.log(e);
    }
  };
};

const initialState = {
  streamList: null,
};
const stream = handleActions(
  {
    [GET_STREALIST]: (state, action) =>
      produce(state, (draft) => {
        draft.streamList = action.payload.streamList;
      }),
  },
  initialState
);

export default stream;
