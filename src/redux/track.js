import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const IS_PLAYING = "/track/IS_PLAYING";
const GET_PLAYTIME = "/track/GET_PLAYTIME";
const GET_ENDTIME = "/track/GET_ENDTIME";
const GET_PLAYBUTTON = "/track/GET_PLAYBUTTON";
const GET_AUDIOPLAYER = "/track/get_AUDIOPLAYER";

export const isPlaying = createAction(IS_PLAYING, (track) => ({ track }));
export const getPlayTime = createAction(GET_PLAYTIME, (time) => ({ time }));
export const getEndTime = createAction(GET_ENDTIME, (time) => ({ time }));
export const getPlayButton = createAction(GET_PLAYBUTTON, (play) => ({ play }));
export const getAudioPlayer = createAction(GET_AUDIOPLAYER, (player) => ({
  player,
}));

export const insPlayingFB = () => {
  console.log("안녕");
  return (dispatch, getState) => {
    console.log("도착은 하니?");
  };
};

const initialState = {
  now_playing: null,
  now_playtime: null,
  now_endTime: null,
  play_button: null,
  audio_player: null,
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
    [GET_PLAYBUTTON]: (state, action) =>
      produce(state, (draft) => {
        draft.play_button = action.payload.play;
      }),
    [GET_AUDIOPLAYER]: (state, action) =>
      produce(state, (draft) => {
        draft.audio_player = action.payload.player;
      }),
  },
  initialState
);

export default track;
