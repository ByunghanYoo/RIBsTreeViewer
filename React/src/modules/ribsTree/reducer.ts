import { createReducer } from "typesafe-actions";
import { SET_ROOT_NODE } from "./actions";
import { RibsTreeAction, RibsTreeState } from "./types";

const initialState: RibsTreeState = {
  rootNode: null,
};

const ribsTreeReducer = createReducer<RibsTreeState, RibsTreeAction>(
  initialState,
  {
    [SET_ROOT_NODE]: (state, action) => ({
      ...state,
      rootNode: action.payload,
    }),
  }
);

export default ribsTreeReducer;
