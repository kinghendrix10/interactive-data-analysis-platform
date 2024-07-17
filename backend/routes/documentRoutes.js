// /backend/routes/documentRoutes.js
const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/documents', documentController.listDocuments);

module.exports = router;
