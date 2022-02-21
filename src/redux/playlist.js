import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../api/api";

const GET_TOPLIST = "GET_TOPLIST";

const getTopList = createAction(GET_TOPLIST, (top5List) => ({
  top5List,
}));

const getTopListFB = () => {
  return async (dispatch) => {
    try {
      const response = await apis({
        method: "get",
        url: `/main`,
      });
      const top5List = response.data;
      console.log(top5List);
      dispatch(getTopList(top5List));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [GET_TOPLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.top5List = action.payload.top5List;
      }),
  },
  {}
);

export const actionsCreators = { getTopListFB };
