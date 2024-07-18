// backend/server.js
require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
