import React, { useState } from 'react';

function SuggestionBox({ formData }) {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      setSuggestion(data.suggestions);
    } catch (err) {
      setSuggestion('Error fetching suggestions.');
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <button
        onClick={getSuggestions}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Get AI Suggestions'}
      </button>

      {suggestion && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-semibold mb-2">AI Suggestions:</h3>
          <p className="text-gray-700 whitespace-pre-line">{suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default SuggestionBox;
