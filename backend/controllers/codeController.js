// /backend/controllers/codeController.js
exports.getCodeSnippet = (req, res) => {
  // In a real application, you would fetch the latest code snippet from a database or cache
  const latestCodeSnippet = `
def analyze_data(data):
    import pandas as pd
    
    df = pd.DataFrame(data)
    summary = df.describe()
    return summary.to_dict()
  `;

  res.status(200).json({
    message: 'Code snippet retrieved successfully',
    code: latestCodeSnippet
  });
};
