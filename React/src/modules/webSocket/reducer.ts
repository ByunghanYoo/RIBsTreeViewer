import { createReducer } from "typesafe-actions";
import { SET_STATUS, SET_WS_URL } from "./actions";
import { WebSocketAction, WebSocketState } from "./types";

const initialState: WebSocketState = {
  url: "ws://0.0.0.0:8875", // null,
  isUrlValid: true, // false,
  status: "disconnected",
};

const webSocketReducer = createReducer<WebSocketState, WebSocketAction>(
  initialState,
  {
    [SET_WS_URL]: (state, action) => {
      const { payload: url } = action;
      const isUrlValid = url != null && 0 < url.length;

      return { ...state, url, isUrlValid };
    },
    [SET_STATUS]: (state, action) => ({ ...state, status: action.payload }),
  }
);

export default webSocketReducer;
