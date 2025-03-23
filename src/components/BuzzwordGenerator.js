"use client";

import { useState, useEffect } from 'react';
import IntensitySlider from './IntensitySlider';
import PersonaSelector from './PersonaSelector';
import { generateBusinessJargon } from '../utils/generator';
import { personaProfiles } from '../data/personaProfiles';

export default function BuzzwordGenerator() {
  // Client-side only logic
  const [mounted, setMounted] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState("General");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState({
    content: "",
    socialContent: ""
  });
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Get the profile data for the selected persona
  const profileData = personaProfiles[selectedPersona] || personaProfiles.General;

  // Only mount component on client side, initializing with empty content
  // to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to generate new content
  const generateContent = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);
    
    try {
      // Use client-side generation instead of API call
      setTimeout(() => {
        try {
          const data = generateBusinessJargon({
            intensity,
            includeEmojis,
            personaName: selectedPersona
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

  const copyToClipboard = () => {
    if (navigator.clipboard && result.socialContent) {
      navigator.clipboard.writeText(result.socialContent)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  };

  // Show loading state until component is mounted on client
  if (!mounted) {
    return <div className="p-4 text-center">Loading generator...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Panel - Controls */}
      <div className="panel">
        <h2 className="section-title">Controls</h2>
        
        <div className="mb-6">
          <IntensitySlider 
            intensity={intensity} 
            onChange={setIntensity} 
          />
        </div>
        
        {/* Persona Selector */}
        <PersonaSelector
          selectedPersona={selectedPersona}
          onChange={setSelectedPersona}
        />
        
        <div className="flex items-center mb-8">
          <input
            id="emoji-toggle"
            type="checkbox"
            checked={includeEmojis}
            onChange={() => setIncludeEmojis(!includeEmojis)}
            className="w-4 h-4 text-[#0066ff] rounded focus:ring-[#0066ff]"
          />
          <label htmlFor="emoji-toggle" className="ml-2 text-lg font-medium">
            Include Emojis
          </label>
        </div>
        
        <button
          onClick={generateContent}
          disabled={loading}
          className={`btn-primary w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
      
      {/* Right Panel - Output Preview */}
      <div className="panel">
        <h2 className="section-title">LinkedIn Post Preview</h2>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white mb-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="ml-3">
              <div 
                className="font-semibold text-[#1a1a1a] relative cursor-pointer group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {profileData.name}
                {showTooltip && (
                  <div className="absolute bottom-full left-0 mb-2 bg-[#1a1a1a] text-white text-xs font-normal py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-10">
                    {profileData.tooltip}
                    <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#1a1a1a] transform rotate-45"></div>
                  </div>
                )}
              </div>
              <div className="text-xs text-[#999999]">{profileData.title} • {profileData.timePosted}</div>
            </div>
            <div className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </div>
          </div>
          
          <div className="whitespace-pre-line mb-3">
            {result.socialContent || result.content}
          </div>
          
          <div className="border-t border-gray-100 pt-3 flex space-x-4 text-[#999999] text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path>
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span className="ml-1">Like</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="ml-1">Comment</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span className="ml-1">Share</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={copyToClipboard}
          className={`w-full py-2 px-4 rounded-lg border border-[#0066ff] text-[#0066ff] hover:bg-[#f0f7ff] transition-colors ${!result.socialContent ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!result.socialContent}
        >
          {copied ? '✅ Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}