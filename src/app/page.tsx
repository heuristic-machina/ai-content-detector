'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">AI Content Detector</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg"
          placeholder="Enter text to analyze..."
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Detect AI Content'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-48 font-medium">AI Probability:</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      result.fakePercentage < 50 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.fakePercentage}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-sm">
                  {result.fakePercentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-48 font-medium">Classification:</div>
              <div className={`${
                result.isHuman ? 'text-green-600' : 'text-red-600'
              } font-semibold`}>
                {result.isHuman ? 'Likely Human-Written' : 'Likely AI-Generated'}
              </div>
            </div>

            <div className="flex">
              <div className="w-48 font-medium">Word Analysis:</div>
              <div>
                {result.aiWords} AI-like words out of {result.textWords} total words
              </div>
            </div>

            {result.sentences && result.sentences.length > 0 && (
              <div className="flex flex-col">
                <div className="w-48 font-medium mb-2">Detailed Feedback:</div>
                <ul className="list-disc pl-6 space-y-2">
                  {result.sentences.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.otherFeedback && (
              <div className="flex">
                <div className="w-48 font-medium">Additional Notes:</div>
                <div>{result.otherFeedback}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

