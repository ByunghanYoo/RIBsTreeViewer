import { combineReducers } from "redux";
import ribsTreeReducer from "./ribsTree";
import webSocketReducer from "./webSocket";

const rootReducer = combineReducers({
  webSocket: webSocketReducer,
  ribsTree: ribsTreeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
