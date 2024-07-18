// backend/routes/codeRoutes.js
const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const { authenticate } = require('../middleware/auth');

// POST /api/code/generate
router.post('/generate', authenticate, codeController.generateCode);

module.exports = router;
