import { createAction } from "typesafe-actions";
import { SendMessagePayload, WebSocketStatus } from "./types";

// Action Types

export const SET_WS_URL = "webSocket/SET_WS_URL";
export const SET_STATUS = "webSocket/SET_STATUS";

export const CONNECT_WEB_SOCKET = "webSocket/CONNECT_WEB_SOCKET";
export const DISCONNECT_WEB_SOCKET = "webSocket/DISCONNECT_WEB_SOCKET";
export const SEND_MESSAGE = "webSocket/SEND_MESSAGE";

// Action Creators

export const setWsUrl = createAction(SET_WS_URL)<string | null>();
export const setStatus = createAction(SET_STATUS)<WebSocketStatus>();

export const connectWebSocket = createAction(CONNECT_WEB_SOCKET)();
export const disconnectWebSocket = createAction(DISCONNECT_WEB_SOCKET)();
export const sendMessage = createAction(SEND_MESSAGE)<SendMessagePayload>();
