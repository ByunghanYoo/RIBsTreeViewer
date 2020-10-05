import { eventChannel, EventChannel, END } from "redux-saga";
import { take, select, put, call, fork, cancel } from "redux-saga/effects";
import { RootState } from "src/modules";
import { setRootNode } from "src/modules/ribsTree";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
  SendMessagePayload,
  setStatus,
  WebSocketState,
} from "src/modules/webSocket";
import {
  isUpdateRootNodeCommand,
  isWebSocketMessage,
  WebSocketMessage,
} from "./types";

function* webSocketSaga() {
  while (true) {
    yield take(connectWebSocket);

    const { isUrlValid, url, status }: WebSocketState = yield select(
      (state: RootState) => state.webSocket
    );
    if (status !== "disconnected" || !isUrlValid || url === null) {
      continue;
    }

    yield put(setStatus("connecting"));

    const socket: WebSocket = yield call(connect, url);
    const channel: EventChannel<any> = yield call(subscribe, socket);
    const writeTask = yield fork(write, socket);
    yield fork(read, channel, writeTask);

    yield put(setStatus("connected"));

    yield fork(listenDisconnect, socket);
  }
}

export default webSocketSaga;

function connect(url: string): Promise<WebSocket> {
  const socket = new WebSocket(url);
  return new Promise((resolve) => {
    socket.onopen = () => {
      resolve(socket);
    };
  });
}

function subscribe(socket: WebSocket): EventChannel<any> {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(data);
      console.log(typeof data);
      console.log(isWebSocketMessage(data));

      if (isWebSocketMessage(data)) {
        const action = handleMessage(data);
        emit(action);
      }
    };
    socket.onclose = () => {
      emit(setStatus("disconnected"));
      emit(END);
    };
    socket.onerror = () => {
      emit(setStatus("disconnected"));
      emit(END);
    };

    return () => {};
  });
}

function handleMessage(message: WebSocketMessage): any | null {
  console.log(`isUpdateRootNodeCommand(message) : ${isUpdateRootNodeCommand(message)}`);
  if (isUpdateRootNodeCommand(message)) {
    console.log(message.data);
    return setRootNode(message.data);
  } else {
    return null;
  }
}

function* listenDisconnect(socket: WebSocket) {
  yield take(disconnectWebSocket);
  socket.close();
}

function* read(channel: EventChannel<any>, writeTask: any) {
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    console.log("channel terminated.");
    yield cancel(writeTask);
  }
}

function* write(socket: WebSocket) {
  try {
    while (true) {
      const payload: SendMessagePayload = yield take(sendMessage);
      socket.send(JSON.stringify(payload));
    }
  } finally {
    console.log("write task canceld.");
  }
}
