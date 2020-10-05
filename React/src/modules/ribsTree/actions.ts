import { createAction } from "typesafe-actions";
import { RibsTreeNode } from "./types";

// Action Types

export const SET_ROOT_NODE = "ribsTree/SET_ROOT_NODE";

// Action Creators

export const setRootNode = createAction(SET_ROOT_NODE)<RibsTreeNode>();
