import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Payloads

// Actions

export type RibsTreeAction = ActionType<typeof actions>;

// State

export interface RibsTreeState {
  rootNode: RibsTreeNode | null;
}

export interface RibsTreeNode {
  name: string;
  children: RibsTreeNode[];
}

export function isRibsTreeNode(object: any): object is RibsTreeNode {
  return object.name !== undefined && object.children !== undefined;
}
