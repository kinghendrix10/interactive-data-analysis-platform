# /scripts/visualization.py
import pandas as pd
import matplotlib.pyplot as plt
import sys
import json
import io
import base64

def generate_visualization(query):
    # TODO: Replace this with actual data loading from your database or file system
    df = pd.read_csv('path/to/your/data.csv')

    # Execute the query
    result = df.query(query)

    # Generate a simple bar chart
    plt.figure(figsize=(10, 6))
    result.plot(kind='bar')
    plt.title(f"Visualization for query: {query}")
    plt.xlabel("X Axis")
    plt.ylabel("Y Axis")

    # Save the plot to a base64 encoded string
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

    # Create a Plotly-like data structure
    chart_data = {
        'data': [{
            'x': result.index.tolist(),
            'y': result.values.tolist(),
            'type': 'bar'
        }],
        'layout': {
            'title': f"Visualization for query: {query}",
            'xaxis': {'title': 'X Axis'},
            'yaxis': {'title': 'Y Axis'}
        },
        'image': f"data:image/png;base64,{image_base64}"
    }

    return json.dumps(chart_data)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Error: Query argument is missing')
        sys.exit(1)

    query = sys.argv[1]
    result = generate_visualization(query)
    print(result)
