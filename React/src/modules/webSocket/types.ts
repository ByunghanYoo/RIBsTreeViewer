import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Payloads

export interface SomePayload {
  someString: string;
}

// Actions

export type WebSocketAction = ActionType<typeof actions>;

// State

export interface WebSocketState {
  url?: string | undefined;
}
