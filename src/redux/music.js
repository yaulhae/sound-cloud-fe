import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import apis from '../api/api';

const GET_ONE_MUSIC = 'GET_ONE_MUSIC';

const getOneMusic = createAction(GET_ONE_MUSIC, music => ({
    music,
}));

const getOneMusicAPI = () => {
    return async dispatch => {
        try {
            const response = await apis({
                method: 'get',
                url: `/music/3`,
            });
            const music = response.data;
            console.log(music);
            dispatch(getOneMusic(music));
        } catch (err) {
            console.log(err);
        }
    };
};

export default handleActions(
    {
        [GET_ONE_MUSIC]: (state, action) =>
            produce(state, draft => {
                draft.music = action.payload.music;
            }),
    },
    {}
);

export const actionsCreators = { getOneMusicAPI };
