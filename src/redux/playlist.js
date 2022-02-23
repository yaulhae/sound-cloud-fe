import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../api/api";

const GET_TOPLIST = "GET_TOPLIST";

const getTopList = createAction(GET_TOPLIST, (top5List) => ({
  top5List,
}));

const getTopListFB = () => {
  console.log("도착1");
  return async (dispatch) => {
    try {
      console.log("도착2");
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

const initialState = {
  top5List: null,
};

export default handleActions(
  {
    [GET_TOPLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.top5List = action.payload.top5List;
      }),
  },
  initialState
);

export const actionsCreators = { getTopListFB };
