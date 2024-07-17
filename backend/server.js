// /backend/server.js
const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const queryRoutes = require('./routes/queryRoutes');
const visualizationRoutes = require('./routes/visualizationRoutes');
const codeRoutes = require('./routes/codeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const executeRoutes = require('./routes/executeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', fileRoutes);
app.use('/api', queryRoutes);
app.use('/api', visualizationRoutes);
app.use('/api', codeRoutes);
app.use('/api', documentRoutes);
app.use('/api', executeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
