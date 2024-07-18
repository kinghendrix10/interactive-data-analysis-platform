// backend/controllers/codeController.js
const { generateCode } = require('../utils/codeGeneration');

exports.generateCode = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const generatedCode = await generateCode(query);
    res.json({ code: generatedCode });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Error generating code' });
  }
};
