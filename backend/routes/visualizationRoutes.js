// backend/routes/visualizationRoutes.js
const express = require('express');
const router = express.Router();
const visualizationController = require('../controllers/visualizationController');
const { authenticate } = require('../middleware/auth');

// POST /api/visualization
router.post('/', authenticate, visualizationController.generateVisualization);

module.exports = router;
