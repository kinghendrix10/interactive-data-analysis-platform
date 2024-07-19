// frontend/components/ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatInterface = ({ onVisualizationRequest, onCodeRequest }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/query', { query: input });
      const assistantMessage = { type: 'assistant', content: response.data.message };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.data.visualization) {
        onVisualizationRequest(response.data.visualization);
      }
      if (response.data.code) {
        onCodeRequest(response.data.code);
      }
    } catch (error) {
      console.error('Error processing query:', error);
      setMessages((prev) => [...prev, { type: 'error', content: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${
              message.type === 'user' ? 'bg-blue-500 text-white' : 
              message.type === 'assistant' ? 'bg-gray-200 text-gray-800' :
              'bg-red-500 text-white'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow mr-2"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
