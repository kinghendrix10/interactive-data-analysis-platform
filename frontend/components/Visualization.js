// frontend/components/Visualization.js
import React from 'react';
import Plot from 'react-plotly.js';

const Visualization = ({ data }) => {
  if (!data) return null;

  const renderChart = () => {
    switch (data.type) {
      case 'bar':
        return (
          <Plot
            data={[
              {
                x: data.x,
                y: data.y,
                type: 'bar',
                marker: { color: 'rgb(55, 83, 109)' },
              },
            ]}
            layout={{ title: data.title, autosize: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        );
      case 'line':
        return (
          <Plot
            data={[
              {
                x: data.x,
                y: data.y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'rgb(55, 83, 109)' },
              },
            ]}
            layout={{ title: data.title, autosize: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        );
      case 'pie':
        return (
          <Plot
            data={[
              {
                values: data.values,
                labels: data.labels,
                type: 'pie',
              },
            ]}
            layout={{ title: data.title, autosize: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      {renderChart()}
    </div>
  );
};

export default Visualization;
