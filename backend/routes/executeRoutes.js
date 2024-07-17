// /backend/routes/executeRoutes.js
const express = require('express');
const executeController = require('../controllers/executeController');

const router = express.Router();

router.post('/execute', executeController.executeCode);

module.exports = router;
