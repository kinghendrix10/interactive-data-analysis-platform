// /backend/controllers/queryController.js
const axios = require('axios');

exports.processQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // TODO: Replace with actual API key and endpoint
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Convert the following natural language query to Python code:\n${query}\n\nPython code:`,
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json',
      },
    });

    const generatedCode = response.data.choices[0].text.trim();
    res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Error processing query' });
  }
};
