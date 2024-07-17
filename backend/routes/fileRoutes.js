// /backend/routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const fileUploadController = require('../controllers/fileUploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), fileUploadController.uploadFile);

module.exports = router;
