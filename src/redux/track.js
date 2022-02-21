import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const IS_PLAYING = "/track/IS_PLAYING";
const GET_PLAYER = "/track/GET_PLAYER";

export const isPlaying = createAction(IS_PLAYING, (track) => ({ track }));
export const getPlayer = createAction(GET_PLAYER, (player) => ({ player }));

const initialState = {
  now_playing: null,
  now_player: null,
};

const track = handleActions(
  {
    [IS_PLAYING]: (state, action) =>
      produce(state, (draft) => {
        draft.now_playing = action.payload.track;
      }),
    [GET_PLAYER]: (state, action) =>
      produce(state, (draft) => {
        draft.now_player = action.payload.player;
      }),
  },
  initialState
);

export default track;
