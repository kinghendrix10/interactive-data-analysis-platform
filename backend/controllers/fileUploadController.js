// /backend/controllers/fileUploadController.js
const xlsx = require('xlsx');
const path = require('path');

exports.uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, '../uploads', file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed', details: err.message });
    }

    // Process the Excel file
    const workbook = xlsx.readFile(uploadPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    res.status(200).json({
      message: 'File uploaded successfully',
      data: jsonData
    });
  });
};
