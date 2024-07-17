// /backend/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/documents', documentController.listDocuments);

module.exports = router;
