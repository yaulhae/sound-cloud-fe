import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const GET_AUDIOPLAYER = "/track/get_AUDIOPLAYER";
const GET_PLAYINGINFO = "/track/IS_PLAYING";
const GET_PLAYTIME = "/track/GET_PLAYTIME";
const GET_ENDTIME = "/track/GET_ENDTIME";

export const getAudioPlayer = createAction(GET_AUDIOPLAYER, (player) => ({
  player,
}));
export const getPlayTime = createAction(GET_PLAYTIME, (time) => ({ time }));
export const getPlayingInfo = createAction(GET_PLAYINGINFO, (stream) => ({
  stream,
}));
export const getEndTime = createAction(GET_ENDTIME, (time) => ({ time }));

const initialState = {
  playing_info: null,
  now_playtime: null,
  now_endTime: null,
  audio_player: null,
};

const track = handleActions(
  {
    [GET_PLAYINGINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.playing_info = action.payload.stream;
      }),
    [GET_PLAYTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.now_playtime = action.payload.time;
      }),
    [GET_ENDTIME]: (state, action) =>
      produce(state, (draft) => {
        draft.now_endTime = action.payload.time;
      }),
    [GET_AUDIOPLAYER]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_player = action.payload.player;
      }),
  },
  initialState
);

export default track;
