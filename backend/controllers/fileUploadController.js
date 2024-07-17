// /backend/controllers/fileUploadController.js
const xlsx = require('xlsx');
const fs = require('fs');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

  try {
    let data;
    if (fileExtension === 'xlsx') {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } else if (fileExtension === 'csv') {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = fileContent.split('\n').map(row => row.split(','));
    } else {
      throw new Error('Unsupported file format');
    }

    // TODO: Save data to database or process it further

    res.status(200).json({ message: 'File uploaded and processed successfully' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  } finally {
    // Clean up temporary file
    fs.unlinkSync(filePath);
  }
};
