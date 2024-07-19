// backend/controllers/queryController.js
const axios = require('axios');
const { processDataForVisualization } = require('../utils/dataProcessing');
const { generateCode } = require('../utils/codeGeneration');

exports.processQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Send query to NLP model (e.g., OpenAI's GPT)
    // Note: You'll need to set up the OpenAI API key in your environment variables
    const nlpResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: query,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const interpretation = nlpResponse.data.choices[0].text.trim();

    // Process the interpretation
    let response = { message: interpretation };

    // Check if visualization is needed
    if (interpretation.includes('visualization')) {
      const visualizationData = await processDataForVisualization({ /* mock data */ }, 'bar');
      response.visualization = visualizationData;
    }

    // Check if code generation is needed
    if (interpretation.includes('code')) {
      const generatedCode = await generateCode(interpretation);
      response.code = generatedCode;
    }

    res.json(response);
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Error processing query' });
  }
};