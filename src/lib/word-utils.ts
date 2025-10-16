/**
 * Utility functions for working with words and arrays
 */

/**
 * Fisher-Yates shuffle algorithm to randomize array order
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Capitalize the first letter of a string
 * @param str The string to capitalize
 * @returns The string with first letter capitalized
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get n random words from a word list
 * @param words Array of words to select from
 * @param n Number of words to select
 * @returns Array of n random words
 */
export function getRandomWords(words: string[], n: number): string[] {
  return shuffleArray(words).slice(0, n);
}

/**
 * Generate a random compound word by combining n words
 * @param words Array of words to select from
 * @param n Number of words to combine (default: 2)
 * @returns A capitalized compound word
 */
export function generateRandomWord(words: string[], n: number = 2): string {
  const selectedWords = getRandomWords(words, n);
  return capitalize(selectedWords.join("&shy;"));
}

/**
 * Represents a word part with both its original and combined form
 */
export interface WordPart {
  /** The original/dictionary form of the word */
  original: string;
  /** The form used when combining with other words */
  combined: string;
}

/**
 * Type for a combining rule function
 * Takes the current word and the next word, returns the combined form of the current word
 */
type CombiningRule = (currentWord: string, nextWord: string) => string;

/**
 * Rule: Avoid triple consonants by removing one consonant when the first word 
 * ends with a double consonant and the second word starts with the same consonant
 */
const avoidTripleConsonants: CombiningRule = (currentWord: string, nextWord: string): string => {
  if (currentWord.length < 2 || nextWord.length < 1) {
    return currentWord;
  }

  const lastChar = currentWord[currentWord.length - 1];
  const secondLastChar = currentWord[currentWord.length - 2];
  const firstCharOfNext = nextWord[0];

  // Check if current word ends with double consonant and next word starts with same consonant
  if (lastChar === secondLastChar && lastChar === firstCharOfNext) {
    return currentWord.slice(0, -1);
  }

  return currentWord;
};

/**
 * All combining rules to apply (in order)
 */
const COMBINING_RULES: CombiningRule[] = [avoidTripleConsonants];

/**
 * Apply combining rules to a pair of words using a sliding window approach
 * @param currentWord The current word
 * @param nextWord The next word (if any)
 * @returns The combined form of the current word
 */
function applyCombiningRules(currentWord: string, nextWord: string | undefined): string {
  if (!nextWord) {
    return currentWord;
  }

  let result = currentWord;
  for (const rule of COMBINING_RULES) {
    result = rule(result, nextWord);
  }

  return result;
}

/**
 * Convert word parts to WordPart objects with both original and combined forms
 * Uses a sliding window approach to apply combining rules
 * @param wordParts Array of original word strings
 * @returns Array of WordPart objects with original and combined forms
 */
export function createWordParts(wordParts: string[]): WordPart[] {
  if (wordParts.length === 0) {
    return [];
  }

  return wordParts.map((word, index) => {
    const nextWord = index < wordParts.length - 1 ? wordParts[index + 1] : undefined;
    return {
      original: word,
      combined: applyCombiningRules(word, nextWord),
    };
  });
}

/**
 * Create a compound word from an array of word parts
 * @param wordParts Array of individual words to combine (strings or WordPart objects)
 * @returns A capitalized compound word
 */
export function createCompoundWord(wordParts: string[] | WordPart[]): string {
  if (wordParts.length === 0) {
    return "";
  }

  // Convert to WordPart objects if necessary
  const parts: WordPart[] = typeof wordParts[0] === 'string' 
    ? createWordParts(wordParts as string[])
    : wordParts as WordPart[];

  const combinedWord = parts.map(part => part.combined).join("&shy;");
  return capitalize(combinedWord);
}

/**
 * Switch/reverse the order of words in a compound word
 * @param wordParts Array of individual words
 * @returns Array with reversed word order
 */
export function switchWordOrder(wordParts: string[]): string[] {
  return [...wordParts].reverse();
}

/**
 * Get n random words with one word fixed (always included)
 * @param words Array of words to select from
 * @param fixedWord The word that must be included
 * @param n Total number of words to select (including the fixed word)
 * @returns Array of n random words including the fixed word
 */
export function getRandomWordsWithFixed(words: string[], fixedWord: string, n: number): string[] {
  if (n <= 0) {
    return [];
  }

  // If the fixed word is not in the word list, return regular random words
  if (!words.includes(fixedWord)) {
    return getRandomWords(words, n);
  }

  // If we only need one word, return the fixed word
  if (n === 1) {
    return [fixedWord];
  }

  // Get random words excluding the fixed word
  const otherWords = words.filter(word => word !== fixedWord);
  const randomOthers = getRandomWords(otherWords, n - 1);

  // Insert the fixed word at a random position
  const position = Math.floor(Math.random() * n);
  const result = [...randomOthers];
  result.splice(position, 0, fixedWord);

  return result;
}
