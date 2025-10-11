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
