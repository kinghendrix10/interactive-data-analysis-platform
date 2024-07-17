// /backend/controllers/documentController.js
const fs = require('fs').promises;
const path = require('path');

exports.listDocuments = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    const files = await fs.readdir(uploadsDir);
    
    const documentList = files.map(file => ({
      name: file,
      path: path.join(uploadsDir, file)
    }));

    res.status(200).json({
      message: 'Documents listed successfully',
      documents: documentList
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error listing documents',
      details: error.message
    });
  }
};
