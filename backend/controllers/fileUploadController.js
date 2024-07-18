// backend/controllers/fileUploadController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const xlsx = require('xlsx');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.uploadFile = upload.single('file');

exports.processFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExt = path.extname(req.file.originalname).toLowerCase();

  try {
    let data;
    if (fileExt === '.xlsx' || fileExt === '.xls') {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } else if (fileExt === '.csv') {
      const fileContent = await fs.readFile(filePath, 'utf8');
      data = fileContent.split('\n').map(row => row.split(','));
    } else {
      throw new Error('Unsupported file format');
    }

    // Process the data as needed
    // For now, we'll just return the first few rows
    const preview = data.slice(0, 5);

    res.json({
      message: 'File uploaded and processed successfully',
      filename: req.file.originalname,
      preview: preview
    });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  } finally {
    // Clean up: delete the uploaded file
    await fs.unlink(filePath);
  }
};
