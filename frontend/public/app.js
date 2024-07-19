// frontend/app.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import NavigationTabs, { TabContent } from '../components/NavigationTabs';
import FileUpload from '../components/FileUpload';
import ChatInterface from '../components/ChatInterface';
import Visualization from '../components/Visualization';
import CodeEditor from '../components/CodeEditor';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentVisualization, setCurrentVisualization] = useState(null);
  const [currentCode, setCurrentCode] = useState('');

  const handleFileUploaded = (fileInfo) => {
    setUploadedFiles((prevFiles) => [...prevFiles, fileInfo]);
  };

  const handleVisualizationRequest = (visualizationData) => {
    setCurrentVisualization(visualizationData);
  };

  const handleCodeRequest = (code) => {
    setCurrentCode(code);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interactive Data Analysis Platform</h1>
      <NavigationTabs>
        <TabContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Chat Interface</h2>
              <ChatInterface
                onVisualizationRequest={handleVisualizationRequest}
                onCodeRequest={handleCodeRequest}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Visualization</h2>
              <Visualization data={currentVisualization} />
            </div>
          </div>
        </TabContent>
        <TabContent value="dashboards">
          <h2 className="text-2xl font-semibold mb-4">Dashboards</h2>
          {/* Add dashboard component here */}
          <p>Dashboard functionality to be implemented.</p>
        </TabContent>
        <TabContent value="code">
          <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>
          <CodeEditor initialCode={currentCode} />
        </TabContent>
        <TabContent value="documents">
          <h2 className="text-2xl font-semibold mb-4">File Upload</h2>
          <FileUpload onFileUploaded={handleFileUploaded} />
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
            <ul className="list-disc pl-5">
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </TabContent>
      </NavigationTabs>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
