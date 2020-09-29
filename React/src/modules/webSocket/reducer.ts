import { createReducer } from "typesafe-actions";
import { WebSocketAction, WebSocketState } from "./types";

const initialState: WebSocketState = {};

const webSocketReducer = createReducer<WebSocketState, WebSocketAction>(initialState, {
  // [DO_SOMETING]: (state, action) => {
  //   const {} = action.payload;
  //   return { ...state };
  // }
});

export default webSocketReducer;
