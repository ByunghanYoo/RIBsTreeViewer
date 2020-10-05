import { isRibsTreeNode, RibsTreeNode } from "src/modules/ribsTree";

export type WebSocketMessage = {
  command: string;
  data: any | null;
};

export function isWebSocketMessage(object: any): object is WebSocketMessage {
  return object.command !== undefined && object.data !== undefined;
}

export type UpdateRootNodeCommand = {
  command: string;
  data: RibsTreeNode;
};

export function isUpdateRootNodeCommand(
  object: any
): object is UpdateRootNodeCommand {
  return (
    object.command !== undefined &&
    object.command === "UPDATE_ROOT_NODE" &&
    object.data !== undefined &&
    isRibsTreeNode(object.data)
  );
}
