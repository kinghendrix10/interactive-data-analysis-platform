// backend/controllers/documentController.js
const fs = require('fs').promises;
const path = require('path');

exports.listDocuments = async (req, res) => {
  try {
    const files = await fs.readdir('uploads/');
    const fileDetails = await Promise.all(files.map(async (file) => {
      const stats = await fs.stat(path.join('uploads/', file));
      return {
        name: file,
        size: stats.size,
        createdAt: stats.birthtime
      };
    }));
    res.json(fileDetails);
  } catch (error) {
    console.error('Error listing documents:', error);
    res.status(500).json({ error: 'Error listing documents' });
  }
};

exports.deleteDocument = async (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }

  try {
    await fs.unlink(path.join('uploads/', filename));
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Error deleting document' });
  }
};
