// backend/routes/index.js
const express = require('express');
const router = express.Router();

const fileRoutes = require('./fileRoutes');
const queryRoutes = require('./queryRoutes');
const visualizationRoutes = require('./visualizationRoutes');
const codeRoutes = require('./codeRoutes');
const documentRoutes = require('./documentRoutes');
const executeRoutes = require('./executeRoutes');

router.use('/files', fileRoutes);
router.use('/query', queryRoutes);
router.use('/visualization', visualizationRoutes);
router.use('/code', codeRoutes);
router.use('/documents', documentRoutes);
router.use('/execute', executeRoutes);

module.exports = router;
