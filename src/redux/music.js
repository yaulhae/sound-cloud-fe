import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import apis from '../api/api';

const GET_ONE_MUSIC = 'GET_ONE_MUSIC';

const getOneMusic = createAction(GET_ONE_MUSIC, music => ({
    music,
}));

const getOneMusicAPI = (musicId = 1) => {
    return async dispatch => {
        try {
            const response = await apis.get(`/music/${musicId}`);
            const music = response.data;
            dispatch(getOneMusic(music));
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
            produce(state, draft => {
                draft.music = action.payload.music;
            }),
    },
    initialState
);

export const actionsCreators = { getOneMusicAPI };
