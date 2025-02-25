"use client";

import { useState, useEffect } from 'react';
import IntensitySlider from './IntensitySlider';
import BusinessSchoolToggle from './BusinessSchoolToggle';
import ShareButton from './ShareButton';
import { generateBusinessJargon } from '../utils/generator';

export default function BuzzwordGenerator() {
  // Client-side only logic
  const [mounted, setMounted] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [businessSchoolMode, setBusinessSchoolMode] = useState(false);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState({
    content: "Press the button to generate some high-quality business jargon.",
    socialContent: ""
  });

  // Only mount component on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to generate new content
  const generateContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use client-side generation instead of API call
      setTimeout(() => {
        try {
          const data = generateBusinessJargon({
            intensity,
            businessSchoolMode,
            includeEmojis,
          });
          
          setResult({
            content: data.content,
            socialContent: data.socialContent
          });
          setLoading(false);
        } catch (err) {
          console.error('Error generating content:', err);
          setError(err.message || 'Failed to generate content. Please try again.');
          setLoading(false);
        }
      }, 300); // Small delay to show loading state
    } catch (err) {
      console.error('Error generating content:', err);
      setError(err.message || 'Failed to generate content. Please try again.');
      setLoading(false);
    }
  };

  // Show loading state until component is mounted on client
  if (!mounted) {
    return <div className="p-4 text-center">Loading generator...</div>;
  }

  return (
    <div className="w-full max-w-2xl px-4 py-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <IntensitySlider 
          intensity={intensity} 
          onChange={setIntensity} 
        />
        
        <BusinessSchoolToggle 
          enabled={businessSchoolMode} 
          onChange={setBusinessSchoolMode} 
        />
        
        <div className="flex items-center mb-6">
          <input
            id="emoji-toggle"
            type="checkbox"
            checked={includeEmojis}
            onChange={() => setIncludeEmojis(!includeEmojis)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="emoji-toggle" className="ml-2 text-lg font-semibold text-gray-800">
            Include Emojis
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <button
          onClick={generateContent}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Business Jargon'}
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg min-h-[100px]">
        <p className="text-gray-800 text-lg">{result.content}</p>
      </div>
      
      {result.socialContent && (
        <div className="space-y-6">
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">LinkedIn Post Preview</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
              {result.socialContent}
            </div>
          </div>
          
          <ShareButton content={result.socialContent} />
        </div>
      )}
    </div>
  );
} 