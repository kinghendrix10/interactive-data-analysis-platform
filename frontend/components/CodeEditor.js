// frontend/components/CodeEditor.js
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

const CodeEditor = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const response = await axios.post('/api/execute', { code });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('An error occurred while executing the code.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <Textarea
          value={code}
          onChange={handleCodeChange}
          className="font-mono w-full h-64"
        />
      ) : (
        <SyntaxHighlighter language="python" style={vscDarkPlus} className="text-sm">
          {code}
        </SyntaxHighlighter>
      )}
      <div className="space-x-2">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'View' : 'Edit'}
        </Button>
        <Button onClick={handleExecute} disabled={isExecuting}>
          {isExecuting ? 'Executing...' : 'Execute'}
        </Button>
      </div>
      {output && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
