// /backend/app.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fileRoutes = require('./routes/fileRoutes');
const queryRoutes = require('./routes/queryRoutes');
const visualizationRoutes = require('./routes/visualizationRoutes');
const codeRoutes = require('./routes/codeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const executeRoutes = require('./routes/executeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api', fileRoutes);
app.use('/api', queryRoutes);
app.use('/api', visualizationRoutes);
app.use('/api', codeRoutes);
app.use('/api', documentRoutes);
app.use('/api', executeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred',
    message: err.message,
    suggestion: 'Please try again or contact support if the problem persists.'
  });
});

module.exports = app;
