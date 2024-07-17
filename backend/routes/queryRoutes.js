// /backend/routes/queryRoutes.js
const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.post('/query', queryController.processQuery);

module.exports = router;
