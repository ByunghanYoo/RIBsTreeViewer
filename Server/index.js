var server = require("ws").Server;
var webSocketServer = new server({ port: 8875 });

webSocketServer.on("connection", (ws) => {
  console.log("⚡️ WebSocket connected.");

  ws.on("message", (message) => {
    console.log(`📲 Message ${message}`);

    webSocketServer.clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on("close", () => {
    console.log("💥 WebSocket disconnected.");
  });
});

console.log("🌞 RIBsTreeViewer WebSocket server is running...");
