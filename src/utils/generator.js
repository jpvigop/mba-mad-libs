import {
  verbs,
  nouns,
  adjectives,
  outcomes,
  corporateAcronyms,
  templates,
  hashTags,
  emojis
} from '../data/wordLists';

import { getPersonaInstance } from '../models/Persona';

// Helper function to get a random element from an array
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to generate a random number of items based on intensity
const getRandomItems = (array, count) => {
  const items = [];
  const arrayCopy = [...array]; // Create a copy to avoid modifying the original

  for (let i = 0; i < count && arrayCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    items.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1); // Remove the selected item to avoid duplicates
  }

  return items;
};

// Function to replace a template placeholder with a random word from the corresponding list
const replaceTemplatePlaceholder = (template, placeholder, wordList) => {
  const regex = new RegExp(`{${placeholder}}`, 'g');
  return template.replace(regex, () => getRandomElement(wordList));
};

// Main function to generate business jargon
export function generateBusinessJargon({
  intensity = 5,
  includeEmojis = true,
  personaName = "General"
}) {
  // Get the appropriate persona
  const persona = getPersonaInstance(personaName);
  
  // Get persona-specific vocabulary and style
  const personaBiases = persona.getBiases();
  const personaStyle = persona.getStyle();
  
  // Use persona style to override includeEmojis if specified
  if (personaStyle.emojis !== undefined) {
    includeEmojis = personaStyle.emojis && includeEmojis; // Respect both persona and user preference
  }
  
  // Adjust values based on intensity (1-10 scale)
  const adjustedIntensity = Math.min(Math.max(intensity, 1), 10);
  
  // Get template
  let result = '';
  
  // Use persona-specific templates
  const templates = persona.getTemplates();
  result = getRandomElement(templates);

  // Replace basic template placeholders with persona-specific vocabulary
  result = replaceTemplatePlaceholder(result, 'verb', personaBiases.verbs);
  result = replaceTemplatePlaceholder(result, 'noun', personaBiases.nouns);
  result = replaceTemplatePlaceholder(result, 'adjective', personaBiases.adjectives);
  result = replaceTemplatePlaceholder(result, 'outcome', personaBiases.outcomes);
  
  // Add corporate acronyms based on intensity
  if (personaStyle.prefersMetrics) {
    const acronymCount = Math.floor(adjustedIntensity / 2); // More acronyms for metric-focused personas
    if (acronymCount > 0) {
      const selectedAcronyms = getRandomItems(corporateAcronyms, acronymCount);
      result = result.replace(/\. $/, '') + ' ' + selectedAcronyms.join(' ') + '.';
    }
  } else {
    const acronymCount = Math.floor(adjustedIntensity / 3);
    if (acronymCount > 0) {
      const selectedAcronyms = getRandomItems(corporateAcronyms, acronymCount);
      result = result.replace(/\. $/, '') + ' ' + selectedAcronyms.join(' ') + '.';
    }
  }
  
  // Add emojis based on intensity and persona preference
  if (includeEmojis) {
    const emojiCount = Math.floor(adjustedIntensity / 2);
    const selectedEmojis = getRandomItems(personaBiases.emojis.length > 0 ? personaBiases.emojis : emojis, emojiCount);
    if (selectedEmojis.length > 0) {
      result += ' ' + selectedEmojis.join(' ');
    }
  }
  
  // Add unhinged content as an easter egg (10% chance or high intensity)
  // Using persona-specific style
  if (Math.random() < 0.1 || adjustedIntensity > 8) {
    // Each persona has their own "wisdoms"
    const unhingedPhrases = persona.getWisdoms();
    result += " " + getRandomElement(unhingedPhrases);
  }
  
  return {
    content: result,
    // Format for social media sharing using persona-specific formatting
    socialContent: formatForSocialMedia(result, persona)
  };
}

// Format content for social media sharing
function formatForSocialMedia(content, persona) {
  // Get persona-specific hashtags
  const personaBiases = persona.getBiases();
  const hashtags = personaBiases.hashtags || hashTags;
  
  // Get 3-5 random hashtags
  const tagCount = Math.floor(Math.random() * 3) + 3;
  const selectedTags = getRandomItems(hashtags, tagCount);
  
  // Get persona-specific intros
  const intros = persona.getIntros();
  const prefix = getRandomElement(intros);
  
  // Get persona-specific wisdoms
  const wisdoms = persona.getWisdoms();
  const wisdom = getRandomElement(wisdoms);
  
  // Format the post based on persona style
  const personaStyle = persona.getStyle();
  
  // Format the post
  let post = `${prefix}\n\n"${content}"\n\n`;
  
  // Add corporate wisdom
  post += wisdom + "\n\n";
  
  // Add hashtags
  post += selectedTags.join(" ");
  
  return post;
}