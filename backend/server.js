// /backend/server.js
const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/api', routes);

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log('Received message:', message);
    // Handle WebSocket messages here
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
