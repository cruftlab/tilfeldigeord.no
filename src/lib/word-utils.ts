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
 * Apply Norwegian word combining rules to a pair of words
 * Rule: If the first word ends with a double consonant and the second word
 * starts with the same consonant, remove one consonant from the first word
 * @param firstWord The first word in the combination
 * @param secondWord The second word in the combination
 * @returns The first word with combining rules applied
 */
function applyCombiningRule(firstWord: string, secondWord: string): string {
  if (firstWord.length < 2 || secondWord.length < 1) {
    return firstWord;
  }

  const lastChar = firstWord[firstWord.length - 1];
  const secondLastChar = firstWord[firstWord.length - 2];
  const firstCharOfSecond = secondWord[0];

  // Check if the first word ends with a double consonant
  // and the second word starts with the same consonant
  if (lastChar === secondLastChar && lastChar === firstCharOfSecond) {
    // Remove the last character (one of the double consonants)
    return firstWord.slice(0, -1);
  }

  return firstWord;
}

/**
 * Apply combining rules to an array of word parts
 * @param wordParts Array of individual words to combine
 * @returns Array of words with combining rules applied
 */
function applyCombiningRules(wordParts: string[]): string[] {
  if (wordParts.length < 2) {
    return wordParts;
  }

  const result: string[] = [];
  for (let i = 0; i < wordParts.length; i++) {
    if (i < wordParts.length - 1) {
      // Apply combining rule between current word and next word
      result.push(applyCombiningRule(wordParts[i], wordParts[i + 1]));
    } else {
      // Last word is not modified
      result.push(wordParts[i]);
    }
  }

  return result;
}

/**
 * Create a compound word from an array of word parts
 * @param wordParts Array of individual words to combine
 * @returns A capitalized compound word
 */
export function createCompoundWord(wordParts: string[]): string {
  const combinedParts = applyCombiningRules(wordParts);
  return capitalize(combinedParts.join("&shy;"));
}

/**
 * Switch/reverse the order of words in a compound word
 * @param wordParts Array of individual words
 * @returns Array with reversed word order
 */
export function switchWordOrder(wordParts: string[]): string[] {
  return [...wordParts].reverse();
}
