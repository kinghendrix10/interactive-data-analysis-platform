// /backend/routes/codeRoutes.js
const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

router.get('/code', codeController.getCodeSnippet);

module.exports = router;
