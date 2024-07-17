// /backend/routes/visualizationRoutes.js
const express = require('express');
const router = express.Router();
const visualizationController = require('../controllers/visualizationController');

router.get('/visualization', visualizationController.getVisualization);

module.exports = router;
