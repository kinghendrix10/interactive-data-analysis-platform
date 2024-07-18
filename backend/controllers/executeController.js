// backend/controllers/executeController.js
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

exports.executeCode = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    // Save code to a temporary file
    const tempFile = path.join('temp', `code_${Date.now()}.py`);
    await fs.writeFile(tempFile, code);

    // Execute the code
    const python = spawn('python', [tempFile]);

    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', async (code) => {
      // Clean up: delete the temporary file
      await fs.unlink(tempFile);

      if (code !== 0) {
        res.status(500).json({ error: 'Code execution failed', output: error });
      } else {
        res.json({ output: output });
      }
    });
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ error: 'Error executing code' });
  }
};
