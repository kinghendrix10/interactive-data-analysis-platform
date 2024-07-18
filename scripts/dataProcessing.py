# /project-root/scripts/dataProcessing.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

def load_data(file_path):
    """Load data from a CSV or Excel file."""
    if file_path.endswith('.csv'):
        return pd.read_csv(file_path)
    elif file_path.endswith(('.xls', '.xlsx')):
        return pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file format. Please use CSV or Excel files.")

def clean_data(df):
    """Perform basic data cleaning operations."""
    # Remove duplicate rows
    df = df.drop_duplicates()
    
    # Handle missing values
    df = df.fillna(df.mean())
    
    # Remove rows with any remaining NaN values
    df = df.dropna()
    
    return df

def normalize_data(df):
    """Normalize numerical columns using StandardScaler."""
    scaler = StandardScaler()
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    df[numeric_columns] = scaler.fit_transform(df[numeric_columns])
    return df

def perform_pca(df, n_components=2):
    """Perform Principal Component Analysis."""
    pca = PCA(n_components=n_components)
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    pca_result = pca.fit_transform(df[numeric_columns])
    return pd.DataFrame(data=pca_result, columns=[f'PC{i+1}' for i in range(n_components)])

def process_data(file_path):
    """Main function to process data."""
    df = load_data(file_path)
    df = clean_data(df)
    df = normalize_data(df)
    pca_df = perform_pca(df)
    
    # Combine original data with PCA results
    result_df = pd.concat([df, pca_df], axis=1)
    
    return result_df

if __name__ == "__main__":
    # This block allows the script to be run standalone for testing
    import sys
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        result = process_data(file_path)
        print(result.head())
    else:
        print("Please provide a file path as an argument.")
