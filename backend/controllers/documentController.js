// /backend/controllers/documentController.js
const fs = require('fs');
const path = require('path');

exports.listDocuments = (req, res) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ error: 'Error listing documents' });
    }

    const documents = files.map(file => ({
      name: file,
      path: `/uploads/${file}`,
      type: path.extname(file).slice(1)
    }));

    res.status(200).json(documents);
  });
};
