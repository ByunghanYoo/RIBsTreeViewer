import { combineReducers } from "redux";
import webSocketReducer from "./webSocket";

const rootReducer = combineReducers({
  webSocket: webSocketReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;