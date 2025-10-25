/**
 * Wordlist Parser Utility
 * 
 * Parses the Dutch vocabulary wordlist markdown file and converts it
 * into structured Word objects for the application.
 */

import { Word, WordCategory, DifficultyLevel } from '../types/models';

export interface ParsedWord {
  dutch: string;
  english: string;
  article?: string; // de, het
  plural?: string;
  conjugations?: {
    present?: string[];
    past?: string[];
    perfect?: string[];
  };
}

/**
 * Extract article (de/het) from Dutch text
 */
function extractArticle(text: string): { article?: string; word: string } {
  const trimmed = text.trim();
  
  if (trimmed.startsWith('de ')) {
    return { article: 'de', word: trimmed.substring(3) };
  }
  
  if (trimmed.startsWith('het ')) {
    return { article: 'het', word: trimmed.substring(4) };
  }
  
  return { word: trimmed };
}

/**
 * Parse plural forms from Dutch text
 * Examples: "de appel, de appels" -> plural: "appels"
 */
function extractPlural(text: string): { word: string; plural?: string } {
  const parts = text.split(',').map(s => s.trim());
  
  if (parts.length === 2) {
    const { word: singular } = extractArticle(parts[0]);
    const { word: plural } = extractArticle(parts[1]);
    return { word: singular, plural };
  }
  
  return { word: text };
}

/**
 * Parse verb conjugations from Dutch text
 * Example: "beginnen (ik begin, jij begint, hij begint, wij beginnen)"
 */
function extractConjugations(text: string): {
  word: string;
  conjugations?: ParsedWord['conjugations'];
} {
  const conjugationMatch = text.match(/^([^(]+)\s*\(([^)]+)\)/);
  
  if (conjugationMatch) {
    const baseVerb = conjugationMatch[1].trim();
    const conjugationText = conjugationMatch[2];
    
    const conjugations: string[] = conjugationText
      .split(',')
      .map(c => c.trim().split(' ').pop() || '')
      .filter(c => c.length > 0);
    
    return {
      word: baseVerb,
      conjugations: {
        present: conjugations,
      },
    };
  }
  
  // Check for past tense patterns (verb, past, past plural, perfect)
  const pastTenseMatch = text.match(/^([^,]+),\s*([^,]+),\s*([^,]+),\s*(.+)$/);
  
  if (pastTenseMatch) {
    const infinitive = pastTenseMatch[1].trim();
    const pastSingular = pastTenseMatch[2].trim();
    const pastPlural = pastTenseMatch[3].trim();
    const perfect = pastTenseMatch[4].trim();
    
    return {
      word: infinitive,
      conjugations: {
        past: [pastSingular, pastPlural],
        perfect: [perfect],
      },
    };
  }
  
  return { word: text };
}

/**
 * Determine word category based on patterns
 */
function categorizeWord(parsed: ParsedWord): WordCategory {
  const dutch = parsed.dutch.toLowerCase();
  const english = parsed.english.toLowerCase();
  
  // Verbs (have conjugations or contain "to" in English)
  if (parsed.conjugations || english.startsWith('to ')) {
    return WordCategory.VERBS;
  }
  
  // Numbers
  if (/^(een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|dertien|veertien|vijftien|honderd|duizend)$/.test(dutch)) {
    return WordCategory.NUMBERS;
  }
  
  // Days of the week
  if (/^(maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)$/.test(dutch)) {
    return WordCategory.TIME;
  }
  
  // Months
  if (/^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)$/.test(dutch)) {
    return WordCategory.TIME;
  }
  
  // Colors
  if (/\b(red|blue|green|yellow|orange|purple|pink|brown|black|white|grey|gray)\b/.test(english)) {
    return WordCategory.COLORS;
  }
  
  // Family
  if (/\b(mother|father|brother|sister|son|daughter|parent|child|uncle|aunt|cousin|grandmother|grandfather)\b/.test(english)) {
    return WordCategory.FAMILY;
  }
  
  // Food
  if (/\b(bread|cheese|milk|meat|fish|egg|vegetable|fruit|apple|banana|carrot|potato|tomato|food|meal|breakfast|lunch|dinner)\b/.test(english)) {
    return WordCategory.FOOD;
  }
  
  // Body parts
  if (/\b(head|eye|ear|nose|mouth|hand|foot|leg|arm|finger|toe|body|face|hair)\b/.test(english)) {
    return WordCategory.BODY;
  }
  
  // Clothes
  if (/\b(shirt|pants|dress|shoe|sock|coat|jacket|hat|wear|clothing)\b/.test(english)) {
    return WordCategory.CLOTHES;
  }
  
  // Weather
  if (/\b(rain|sun|wind|snow|cloud|weather|storm|hot|cold|warm)\b/.test(english)) {
    return WordCategory.WEATHER;
  }
  
  // Greetings/Common phrases
  if (/^(hallo|goedemorgen|goedemiddag|goedenavond|dag|tot ziens|dank|bedankt|alsjeblieft|sorry|ja|nee)/.test(dutch)) {
    return WordCategory.GREETINGS;
  }
  
  // Default to common words
  return WordCategory.COMMON;
}

/**
 * Determine difficulty level based on word complexity
 */
function determineDifficulty(parsed: ParsedWord): DifficultyLevel {
  const wordLength = parsed.dutch.length;
  const hasConjugations = !!parsed.conjugations;
  const isPhrase = parsed.dutch.includes(' ');
  
  // Beginner: Short words, no conjugations, common phrases
  if (wordLength <= 5 && !hasConjugations && !isPhrase) {
    return DifficultyLevel.BEGINNER;
  }
  
  // Advanced: Long words, complex conjugations, or phrases
  if (wordLength > 12 || (hasConjugations && parsed.conjugations?.past) || isPhrase) {
    return DifficultyLevel.ADVANCED;
  }
  
  // Intermediate: everything else
  return DifficultyLevel.INTERMEDIATE;
}

/**
 * Parse a single word entry from the wordlist
 */
function parseWordEntry(dutch: string, english: string): ParsedWord {
  // Extract article
  const { article, word: withoutArticle } = extractArticle(dutch);
  
  // Extract plural
  const { word: singular, plural } = extractPlural(withoutArticle);
  
  // Extract conjugations
  const { word: baseWord, conjugations } = extractConjugations(singular);
  
  return {
    dutch: baseWord,
    english: english.trim(),
    article,
    plural,
    conjugations,
  };
}

/**
 * Convert parsed word to Word model
 */
function convertToWord(parsed: ParsedWord, index: number): Word {
  const category = categorizeWord(parsed);
  const difficulty = determineDifficulty(parsed);
  
  // Build display Dutch (with article if present)
  let displayDutch = parsed.dutch;
  if (parsed.article) {
    displayDutch = `${parsed.article} ${parsed.dutch}`;
  }
  
  // Build example sentence
  let exampleDutch = `Ik gebruik "${displayDutch}".`;
  let exampleEnglish = `I use "${parsed.english}".`;
  
  // Special handling for verbs
  if (parsed.conjugations && parsed.english.startsWith('to ')) {
    exampleDutch = `Ik kan ${parsed.dutch}.`;
    exampleEnglish = `I can ${parsed.english}.`;
  }
  
  return {
    id: `wl_${index + 1}`,
    dutch: displayDutch,
    english: parsed.english,
    category,
    difficulty,
    exampleDutch,
    exampleEnglish,
    audioUrl: undefined,
    imageUrl: undefined,
    notes: parsed.plural ? `Plural: ${parsed.plural}` : undefined,
  };
}

/**
 * Parse the entire wordlist markdown content
 */
export function parseWordlistMarkdown(content: string): Word[] {
  const lines = content.split('\n');
  const words: Word[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, headers, and separators
    if (!line || line.startsWith('|Dutch|') || line.startsWith('|---|')) {
      continue;
    }
    
    // Parse markdown table row
    const match = line.match(/^\d+\.\|([^|]+)\|([^|]+)\|?$/);
    
    if (match) {
      const dutch = match[1].trim();
      const english = match[2].trim();
      
      // Skip empty entries
      if (!dutch || !english) {
        continue;
      }
      
      try {
        const parsed = parseWordEntry(dutch, english);
        const word = convertToWord(parsed, words.length);
        words.push(word);
      } catch (error) {
        console.warn(`Failed to parse word: ${dutch} | ${english}`, error);
      }
    }
  }
  
  return words;
}

/**
 * Load wordlist from file
 */
export async function loadWordlistFromFile(filePath: string): Promise<Word[]> {
  try {
    const response = await fetch(filePath);
    const content = await response.text();
    return parseWordlistMarkdown(content);
  } catch (error) {
    console.error('Failed to load wordlist:', error);
    throw new Error('Could not load vocabulary wordlist');
  }
}
