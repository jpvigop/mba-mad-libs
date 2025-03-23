import { 
  verbs as generalVerbs, 
  nouns as generalNouns, 
  adjectives as generalAdjectives, 
  outcomes as generalOutcomes, 
  templates as generalTemplates,
  businessSchoolTemplates,
  hashTags as generalHashTags,
  emojis as generalEmojis
} from '../data/wordLists';

import {
  personaData
} from '../data/personaData';

/**
 * Base Persona class that defines the interface for all persona implementations
 */
export class BasePersona {
  constructor() {
    this.name = "Base Persona";
  }

  /**
   * Get persona introduction lines
   */
  getIntros() {
    return [
      "Just shared this with my MBA cohort:",
      "As I was telling my leadership team today:"
    ];
  }

  /**
   * Get quote templates specific to this persona
   */
  getTemplates() {
    return generalTemplates;
  }

  /**
   * Get vocabulary biases for this persona
   */
  getBiases() {
    return {
      verbs: generalVerbs,
      nouns: generalNouns,
      adjectives: generalAdjectives,
      outcomes: generalOutcomes,
      hashtags: generalHashTags,
      emojis: generalEmojis
    };
  }

  /**
   * Get styling preferences for this persona
   */
  getStyle() {
    return {
      prefersLongSentences: false,
      emojis: true,
      mentionsLegacy: false,
      prefersMetrics: false
    };
  }

  /**
   * Get wisdom quotes for this persona
   */
  getWisdoms() {
    return [
      "This is how you build real competitive advantage.",
      "The businesses that understand this will thrive in the next decade."
    ];
  }
}

/**
 * General default persona that uses the standard word lists
 */
export class GeneralPersona extends BasePersona {
  constructor() {
    super();
    this.name = "General";
    this.data = personaData.General;
  }

  getIntros() {
    return this.data.intros || super.getIntros();
  }

  getTemplates() {
    return this.data.quoteTemplates || generalTemplates;
  }

  getBiases() {
    return {
      verbs: generalVerbs,
      nouns: generalNouns,
      adjectives: generalAdjectives,
      outcomes: generalOutcomes,
      hashtags: generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms || super.getWisdoms();
  }

  getBusinessSchoolTemplates() {
    return businessSchoolTemplates;
  }
}

/**
 * Sam Altman persona
 */
export class SamAltmanPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Sam Altman";
    this.data = personaData["Sam Altman"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis // Keep general emojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Elon Musk persona
 */
export class ElonMuskPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Elon Musk";
    this.data = personaData["Elon Musk"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Jeff Bezos persona
 */
export class JeffBezosPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Jeff Bezos";
    this.data = personaData["Jeff Bezos"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Marc Andreessen persona
 */
export class MarcAndreessenPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Marc Andreessen";
    this.data = personaData["Marc Andreessen"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Peter Thiel persona
 */
export class PeterThielPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Peter Thiel";
    this.data = personaData["Peter Thiel"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Mark Zuckerberg persona
 */
export class MarkZuckerbergPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Mark Zuckerberg";
    this.data = personaData["Mark Zuckerberg"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Donald Trump persona
 */
export class DonaldTrumpPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Donald Trump";
    this.data = personaData["Donald Trump"];
  }

  getIntros() {
    return this.data.intros;
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms;
  }
}

/**
 * Harvard MBA persona
 */
export class HarvardMBAPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Harvard MBA";
    this.data = personaData["Harvard MBA"];
  }

  getIntros() {
    return this.data.intros || super.getIntros();
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: this.data.emojis || generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms || super.getWisdoms();
  }
}

/**
 * Crypto Bro persona
 */
export class CryptoBroPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Crypto Bro";
    this.data = personaData["Crypto Bro"];
  }

  getIntros() {
    return this.data.intros || super.getIntros();
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: this.data.emojis || generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms || super.getWisdoms();
  }
}

/**
 * Ex-McKinsey Consultant persona
 */
export class ExMcKinseyConsultantPersona extends BasePersona {
  constructor() {
    super();
    this.name = "Ex-McKinsey Consultant";
    this.data = personaData["Ex-McKinsey Consultant"];
  }

  getIntros() {
    return this.data.intros || super.getIntros();
  }

  getTemplates() {
    return this.data.quoteTemplates || super.getTemplates();
  }

  getBiases() {
    return {
      verbs: this.data.verbs || generalVerbs,
      nouns: this.data.nouns || generalNouns,
      adjectives: this.data.adjectives || generalAdjectives,
      outcomes: this.data.outcomes || generalOutcomes,
      hashtags: this.data.hashtags || generalHashTags,
      emojis: this.data.emojis || generalEmojis
    };
  }

  getStyle() {
    return this.data.style || super.getStyle();
  }
  
  getWisdoms() {
    return this.data.wisdoms || super.getWisdoms();
  }
}

/**
 * Factory function to get a persona instance by name
 */
export function getPersonaInstance(name) {
  switch (name) {
    case "Sam Altman":
      return new SamAltmanPersona();
    case "Elon Musk":
      return new ElonMuskPersona();
    case "Jeff Bezos":
      return new JeffBezosPersona();
    case "Marc Andreessen":
      return new MarcAndreessenPersona();
    case "Peter Thiel":
      return new PeterThielPersona();
    case "Mark Zuckerberg":
      return new MarkZuckerbergPersona();
    case "Donald Trump":
      return new DonaldTrumpPersona();
    case "Harvard MBA":
      return new HarvardMBAPersona();
    case "Crypto Bro":
      return new CryptoBroPersona();
    case "Ex-McKinsey Consultant":
      return new ExMcKinseyConsultantPersona();
    case "General":
    default:
      return new GeneralPersona();
  }
}
