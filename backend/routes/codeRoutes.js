// /backend/routes/codeRoutes.js
const express = require('express');
const codeController = require('../controllers/codeController');

const router = express.Router();

router.get('/code', codeController.getCodeSnippet);

module.exports = router;
