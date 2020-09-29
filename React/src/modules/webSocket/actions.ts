import { createAction } from "typesafe-actions";
import { SomePayload } from "./types";

// Action Types

export const DO_SOMETING = "webSocket/DO_SOMETING";

// Action Creators

export const doSomething = createAction(DO_SOMETING)<SomePayload>();
