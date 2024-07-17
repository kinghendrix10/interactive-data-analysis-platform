// /frontend/components/Visualization.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Visualization = ({ query }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisualizationData = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/visualization', {
          params: { query },
        });
        setChartData(response.data);
      } catch (err) {
        console.error('Error fetching visualization data:', err);
        setError('Failed to load visualization data');
      } finally {
        setLoading(false);
      }
    };

    fetchVisualizationData();
  }, [query]);

  if (loading) return <div>Loading visualization...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return null;

  return (
    <div className="visualization">
      <Plot
        data={chartData.data}
        layout={chartData.layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Visualization;
