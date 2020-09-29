var server = require('ws').Server;
var webSocketServer = new server({ port: 8080 });

webSocketServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(message);

    webSocketServer.clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on('close', () => {
  });
});
