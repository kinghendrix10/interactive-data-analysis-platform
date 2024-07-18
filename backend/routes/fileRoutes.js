// backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');
const { authenticate } = require('../middleware/auth');

// POST /api/files/upload
router.post('/upload', authenticate, fileUploadController.uploadFile, fileUploadController.processFile);

module.exports = router;
