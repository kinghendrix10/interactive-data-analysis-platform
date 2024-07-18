// backend/routes/queryRoutes.js
const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const { authenticate } = require('../middleware/auth');

// POST /api/query
router.post('/', authenticate, queryController.processQuery);

module.exports = router;
