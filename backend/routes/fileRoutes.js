// /backend/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileUploadController');

router.post('/upload', fileUploadController.uploadFile);

module.exports = router;
