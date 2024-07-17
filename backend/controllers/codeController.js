// /backend/controllers/codeController.js
let lastGeneratedCode = '';

exports.getCodeSnippet = (req, res) => {
  if (!lastGeneratedCode) {
    return res.status(404).json({ error: 'No code snippet available' });
  }

  res.status(200).json({ code: lastGeneratedCode });
};

// This function should be called after generating code in queryController
exports.updateLastGeneratedCode = (code) => {
  lastGeneratedCode = code;
};
