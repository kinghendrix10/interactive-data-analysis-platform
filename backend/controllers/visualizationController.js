// /backend/controllers/visualizationController.js
const { generateChart } = require('../utils/chartGenerator');

exports.getVisualization = (req, res) => {
  const { data, chartType } = req.query;

  try {
    const chartData = JSON.parse(data);
    const chart = generateChart(chartData, chartType);

    res.status(200).json({
      message: 'Visualization generated successfully',
      chart: chart
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error generating visualization',
      details: error.message
    });
  }
};

