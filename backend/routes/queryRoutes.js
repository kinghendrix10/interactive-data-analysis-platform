// /backend/routes/queryRoutes.js
const express = require('express');
const queryController = require('../controllers/queryController');

const router = express.Router();

router.post('/query', queryController.processQuery);

module.exports = router;
