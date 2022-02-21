import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const IS_PLAYING = "/track/IS_PLAYING";
const GET_PLAYTIME = "/track/GET_PLAYTIME";
const GET_ENDTIME = "/track/GET_ENDTIME";

export const isPlaying = createAction(IS_PLAYING, (track) => ({ track }));
export const getPlayTime = createAction(GET_PLAYTIME, (time) => ({ time }));
export const getEndTime = createAction(GET_ENDTIME, (time) => ({ time }));

const initialState = {
  now_playing: null,
  now_playtime: null,
  now_endTime: null,
};

const track = handleActions(
  {
    [IS_PLAYING]: (state, action) =>
      produce(state, (draft) => {
        draft.now_playing = action.payload.track;
      }),
    [GET_PLAYTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.now_playtime = action.payload.time;
      }),
    [GET_ENDTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.now_endTime = action.payload.time;
      }),
  },
  initialState
);

export default track;
