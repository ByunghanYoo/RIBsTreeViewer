import { fork } from "redux-saga/effects";
import webSocketSaga from "./webSocketSaga";

export default function* rootSaga() {
  yield fork(webSocketSaga);
}
