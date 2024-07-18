// backend/routes/executeRoutes.js
const express = require('express');
const router = express.Router();
const executeController = require('../controllers/executeController');
const { authenticate } = require('../middleware/auth');

// POST /api/execute
router.post('/', authenticate, executeController.executeCode);

module.exports = router;
