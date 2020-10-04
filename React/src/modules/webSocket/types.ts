import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Payloads

export interface SendMessagePayload {
  command: string;
  data: any;
}

// Actions

export type WebSocketAction = ActionType<typeof actions>;

// State

export interface WebSocketState {
  url: string | null;
  isUrlValid: boolean;
  status: WebSocketStatus;
}

export type WebSocketStatus = "disconnected" | "connecting" | "connected";
