import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import {
  connectWebSocket,
  disconnectWebSocket,
  setWsUrl,
} from "./modules/webSocket";
import Tree from "react-d3-tree";

const App = () => {
  const dispach = useDispatch();

  const wsUrl = useSelector((store: RootState) => store.webSocket.url);
  const isUrlValid = useSelector(
    (store: RootState) => store.webSocket.isUrlValid
  );
  const wsStatus = useSelector((store: RootState) => store.webSocket.status);
  const rootNode = useSelector((store: RootState) => store.ribsTree.rootNode);

  return (
    <div>
      <div>
        RIBs Tree Viewer
        <br />
        <input
          value={wsUrl || ""}
          onChange={(e) => dispach(setWsUrl(e.target.value))}
        />
        {`${wsUrl || ""} is `}
        {isUrlValid ? "Valid WebSocket URL" : "Invalid WebSocket URL"}
        <br />
        {`WebSocket ${wsStatus}.`}
        <br />
        <br />
        <div onClick={() => dispach(connectWebSocket())}>웹소켓 연결</div>
        <br />
        <div onClick={() => dispach(disconnectWebSocket())}>
          웹소켓 연결 해제
        </div>
        <br />
      </div>
      {rootNode ? (
        <div id="treeWrapper" style={{ width: "100%", height: "1000px" }}>
          <Tree
            data={rootNode}
            nodeSize={{ x: 250, y: 75 }}
            transitionDuration={0}
          />
        </div>
      ) : undefined}
    </div>
  );
};

export default App;
