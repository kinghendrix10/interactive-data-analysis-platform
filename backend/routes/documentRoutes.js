// backend/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authenticate } = require('../middleware/auth');

// GET /api/documents
router.get('/', authenticate, documentController.listDocuments);

// DELETE /api/documents/:filename
router.delete('/:filename', authenticate, documentController.deleteDocument);

module.exports = router;
