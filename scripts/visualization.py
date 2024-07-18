# /project-root/scripts/visualization.py
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import json

def create_histogram(data, column, title):
    """Create a histogram for a specified column."""
    plt.figure(figsize=(10, 6))
    sns.histplot(data[column], kde=True)
    plt.title(title)
    plt.xlabel(column)
    plt.ylabel('Frequency')
    return plt

def create_scatter_plot(data, x_column, y_column, title):
    """Create a scatter plot for two specified columns."""
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=data, x=x_column, y=y_column)
    plt.title(title)
    plt.xlabel(x_column)
    plt.ylabel(y_column)
    return plt

def create_box_plot(data, column, title):
    """Create a box plot for a specified column."""
    plt.figure(figsize=(10, 6))
    sns.boxplot(y=data[column])
    plt.title(title)
    plt.ylabel(column)
    return plt

def create_correlation_heatmap(data, title):
    """Create a correlation heatmap for numerical columns."""
    numeric_columns = data.select_dtypes(include=['float64', 'int64']).columns
    corr_matrix = data[numeric_columns].corr()
    plt.figure(figsize=(12, 10))
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
    plt.title(title)
    return plt

def generate_visualization(data, viz_type, params):
    """Generate a visualization based on the specified type and parameters."""
    if viz_type == 'histogram':
        return create_histogram(data, params['column'], params['title'])
    elif viz_type == 'scatter':
        return create_scatter_plot(data, params['x_column'], params['y_column'], params['title'])
    elif viz_type == 'box':
        return create_box_plot(data, params['column'], params['title'])
    elif viz_type == 'heatmap':
        return create_correlation_heatmap(data, params['title'])
    else:
        raise ValueError(f"Unsupported visualization type: {viz_type}")

def save_visualization(plt, output_path):
    """Save the visualization to a file."""
    plt.savefig(output_path)
    plt.close()

def main(data_path, viz_type, params, output_path):
    """Main function to generate and save a visualization."""
    data = pd.read_csv(data_path)
    viz = generate_visualization(data, viz_type, params)
    save_visualization(viz, output_path)
    print(f"Visualization saved to {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 4:
        data_path = sys.argv[1]
        viz_type = sys.argv[2]
        params = json.loads(sys.argv[3])
        output_path = sys.argv[4]
        main(data_path, viz_type, params, output_path)
    else:
        print("Usage: python visualization.py <data_path> <viz_type> <params_json> <output_path>")
