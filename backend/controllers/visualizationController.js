// /backend/controllers/visualizationController.js
const { spawn } = require('child_process');

exports.getVisualization = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const pythonProcess = spawn('python', ['./scripts/visualization.py', query]);

  let result = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Visualization script exited with code ${code}`);
      return res.status(500).json({ error: 'Error generating visualization' });
    }

    try {
      const chartData = JSON.parse(result);
      res.status(200).json(chartData);
    } catch (err) {
      console.error('Error parsing visualization data:', err);
      res.status(500).json({ error: 'Error parsing visualization data' });
    }
  });
};
