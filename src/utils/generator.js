import {
  verbs,
  nouns,
  adjectives,
  outcomes,
  businessFrameworks,
  caseStudies,
  corporateAcronyms,
  templates,
  businessSchoolTemplates,
  hashTags,
  emojis
} from '../data/wordLists';

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
  businessSchoolMode = false,
  includeEmojis = true
}) {
  // Adjust values based on intensity (1-10 scale)
  const adjustedIntensity = Math.min(Math.max(intensity, 1), 10);
  
  // Use business school templates 100% of the time in business school mode,
  // otherwise use regular templates
  let result = '';
  
  if (businessSchoolMode && Math.random() < 0.8) {
    result = getRandomElement(businessSchoolTemplates);
    result = replaceTemplatePlaceholder(result, 'caseStudy', caseStudies);
    result = replaceTemplatePlaceholder(result, 'framework', businessFrameworks);
  } else {
    result = getRandomElement(templates);
  }

  // Replace basic template placeholders
  result = replaceTemplatePlaceholder(result, 'verb', verbs);
  result = replaceTemplatePlaceholder(result, 'noun', nouns);
  result = replaceTemplatePlaceholder(result, 'adjective', adjectives);
  result = replaceTemplatePlaceholder(result, 'outcome', outcomes);
  
  // Add corporate acronyms based on intensity
  const acronymCount = Math.floor(adjustedIntensity / 3);
  if (acronymCount > 0) {
    const selectedAcronyms = getRandomItems(corporateAcronyms, acronymCount);
    result = result.replace(/\. $/, '') + ' ' + selectedAcronyms.join(' ') + '.';
  }
  
  // Add emojis based on intensity
  if (includeEmojis) {
    const emojiCount = Math.floor(adjustedIntensity / 2);
    const selectedEmojis = getRandomItems(emojis, emojiCount);
    if (selectedEmojis.length > 0) {
      result += ' ' + selectedEmojis.join(' ');
    }
  }
  
  // Add unhinged content as an easter egg (10% chance or high intensity)
  if (Math.random() < 0.1 || adjustedIntensity > 8) {
    const unhingedPhrases = [
      " DISRUPT OR DIE!!!",
      " This is what separates the unicorns from the ponies.",
      " My mentor at McKinsey always said this.",
      " I learned this at Harvard Business School and it changed everything.",
      " This strategy literally prints money.",
      " The competition won't know what hit them!",
      " This is the secret sauce the top 1% doesn't want you to know about.",
      " THINK OUTSIDE THE BOX UNTIL THE BOX DOESN'T EXIST ANYMORE!",
      " I've made millions with this exact framework."
    ];
    result += getRandomElement(unhingedPhrases);
  }
  
  return {
    content: result,
    // Format for social media sharing
    socialContent: formatForSocialMedia(result, businessSchoolMode)
  };
}

// Format content for social media sharing
function formatForSocialMedia(content, businessSchoolMode) {
  // Get 3-5 random hashtags
  const tagCount = Math.floor(Math.random() * 3) + 3;
  const selectedTags = getRandomItems(hashTags, tagCount);
  
  // Add "MBA" or "Harvard Business School" references in business school mode
  const prefixes = [
    "Just shared this with my MBA cohort:",
    "As I was telling my leadership team today:",
    "My key takeaway from today's strategy session:",
    "The insight that transformed our Q3 results:",
    "What I wish I knew before getting my MBA:"
  ];
  
  const businessSchoolPrefixes = [
    "What I learned at Harvard Business School:",
    "My professor at Wharton always emphasized:",
    "Case study insight of the day:",
    "The framework that got me through my MBA:",
    "From my business school capstone project:"
  ];
  
  const prefix = businessSchoolMode 
    ? getRandomElement(businessSchoolPrefixes) 
    : getRandomElement(prefixes);
  
  // Format the post
  let post = `${prefix}\n\n"${content}"\n\n`;
  
  // Add some corporate wisdom
  const wisdoms = [
    "This is how you build real competitive advantage.",
    "The businesses that understand this will thrive in the next decade.",
    "Are you making this critical strategic pivot, or being left behind?",
    "This is the difference between 5% and 500% growth.",
    "My mentor taught me this and it changed everything."
  ];
  
  post += getRandomElement(wisdoms) + "\n\n";
  post += selectedTags.join(" ");
  
  return post;
} 