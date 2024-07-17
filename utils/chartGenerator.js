// utils/chartGenerator.js
const Plotly = require('plotly.js-dist');

exports.generateChart = (data, chartType) => {
    let traces = [];
    let layout = {};

    switch (chartType) {
        case 'bar':
            traces = [{
                x: data.map(d => d.x),
                y: data.map(d => d.y),
                type: 'bar'
            }];
            layout = {
                title: 'Bar Chart',
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' }
            };
            break;
        case 'line':
            traces = [{
                x: data.map(d => d.x),
                y: data.map(d => d.y),
                type: 'scatter',
                mode: 'lines+markers'
            }];
            layout = {
                title: 'Line Chart',
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' }
            };
            break;
        case 'scatter':
            traces = [{
                x: data.map(d => d.x),
                y: data.map(d => d.y),
                mode: 'markers',
                type: 'scatter'
            }];
            layout = {
                title: 'Scatter Plot',
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' }
            };
            break;
        default:
            throw new Error('Unsupported chart type');
    }

    return { data: traces, layout: layout };
};
