// /backend/controllers/queryController.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.processQuery = async (req, res) => {
  try {
    const { query } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Convert the following natural language query to Python code:\n\n${query}\n\nPython code:`,
      max_tokens: 150,
    });

    const generatedCode = completion.data.choices[0].text.trim();

    res.status(200).json({
      message: 'Query processed successfully',
      generatedCode: generatedCode
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error processing query',
      details: error.message
    });
  }
};
