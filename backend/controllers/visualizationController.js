// backend/controllers/visualizationController.js
const { processDataForVisualization } = require('../utils/dataProcessing');

exports.generateVisualization = async (req, res) => {
  const { data, type } = req.body;

  if (!data || !type) {
    return res.status(400).json({ error: 'Data and visualization type are required' });
  }

  try {
    const visualizationData = await processDataForVisualization(data, type);
    res.json(visualizationData);
  } catch (error) {
    console.error('Error generating visualization:', error);
    res.status(500).json({ error: 'Error generating visualization' });
  }
};
