// /backend/routes/visualizationRoutes.js
const express = require('express');
const visualizationController = require('../controllers/visualizationController');

const router = express.Router();

router.get('/visualization', visualizationController.getVisualization);

module.exports = router;
