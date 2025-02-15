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
      <h1 className="text-3xl font-bold mb-8 text-white">AI Content Detector</h1>
      
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
        <div className="mt-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Analysis Results</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-48 font-medium text-gray-700">AI Probability:</div>
              <div className="flex-1">
                <div className="w-full bg-gray-100 rounded-full h-5">
                  <div 
                    className={`h-5 rounded-full transition-all duration-500 ${
                      result.fakePercentage < 50 
                        ? 'bg-gradient-to-r from-green-400 to-green-500' 
                        : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${result.fakePercentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm font-medium">
                  {result.fakePercentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex items-center p-4 rounded-lg bg-gray-50">
              <div className="w-48 font-medium text-gray-700">Classification:</div>
              <div className={`${
                result.isHuman 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-red-600 bg-red-50'
              } font-bold px-4 py-2 rounded-md`}>
                {result.isHuman ? 'Likely Human-Written' : 'Likely AI-Generated'}
              </div>
            </div>

            <div className="flex items-center p-4 rounded-lg bg-gray-50">
              <div className="w-48 font-medium text-gray-700">Word Analysis:</div>
              <div className="text-gray-800">
                <span className="font-semibold text-red-600">{result.aiWords}</span> AI-like words out of{' '}
                <span className="font-semibold">{result.textWords}</span> total words
              </div>
            </div>

            {result.sentences && result.sentences.length > 0 && (
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="font-medium text-gray-700 mb-3">Detailed Feedback:</div>
                <ul className="space-y-3">
                  {result.sentences.map((sentence, index) => (
                    <li key={index} className="flex gap-3 text-gray-700">
                      <span className="text-gray-400">•</span>
                      <span>{sentence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.otherFeedback && (
              <div className="flex p-4 rounded-lg bg-gray-50">
                <div className="w-48 font-medium text-gray-700">Additional Notes:</div>
                <div className="text-gray-700">{result.otherFeedback}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

