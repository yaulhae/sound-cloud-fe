import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import apis from "../api/api";

const GET_ONE_MUSIC = "GET_ONE_MUSIC";
const CREATE_COMMENT = "CREATE_COMMENT";
const GET_COMMENT_TIME = "GET_COMMENT_TIME";

const getOneMusic = createAction(GET_ONE_MUSIC, (music) => ({
  music,
}));

const createComment = createAction(CREATE_COMMENT, (comment) => ({
  comment,
}));

const getCommentTime = createAction(GET_COMMENT_TIME, (commentTime) => ({
  commentTime,
}));

const getOneMusicAPI = (musicId = 1) => {
  return async (dispatch) => {
    try {
      const response = await apis.get(`/music/${musicId}`);
      const music = response.data;
      dispatch(getOneMusic(music));
    } catch (err) {
      console.log(err);
    }
  };
};

const createCommentAPI = (commentObj, musicId = 1) => {
  return async (dispatch) => {
    try {
      console.log(commentObj);

      const response = await apis.post(`/music/${musicId}/comment`, commentObj);

      const _commentObj = response.data;

      dispatch(createComment(_commentObj));
      console.log(_commentObj);
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  music: null,
};

export default handleActions(
  {
    [GET_ONE_MUSIC]: (state, action) =>
      produce(state, (draft) => {
        draft.music = action.payload.music;
      }),
    [CREATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.music.commentList = [
          ...draft.music.commentList,
          action.payload.comment,
        ];
      }),
    [GET_COMMENT_TIME]: (state, action) =>
      produce(state, (draft) => {
        draft.music.commentTime = action.payload.commentTime;
      }),
  },
  initialState
);

export const actionsCreators = {
  getOneMusicAPI,
  createCommentAPI,
  getCommentTime,
};
