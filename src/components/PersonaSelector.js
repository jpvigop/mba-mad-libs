"use client";

import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { personaData } from '../data/personaData';

/**
 * PersonaSelector component for selecting different personas for the generator
 */
export default function PersonaSelector({ selectedPersona, onChange }) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Get list of available personas from personaData
  const personas = Object.keys(personaData);

  return (
    <div className="mb-6 relative">
      <div className="flex items-center mb-2">
        <label 
          htmlFor="persona-select" 
          className="block text-lg font-semibold mb-1"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Persona Style
          <span className="ml-1 text-gray-500 text-sm cursor-help">(?)</span>
        </label>
        
        {showTooltip && (
          <Tooltip>
            Select a persona to generate posts in their unique tone and buzzwords.
          </Tooltip>
        )}
      </div>
      
      <select
        id="persona-select"
        value={selectedPersona}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#0066ff] focus:border-[#0066ff]"
      >
        {personas.map((persona) => (
          <option key={persona} value={persona}>
            {persona}
          </option>
        ))}
      </select>
    </div>
  );
}
