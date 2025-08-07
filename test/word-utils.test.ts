import { describe, it, expect } from 'vitest';
import { 
  shuffleArray, 
  capitalize, 
  getRandomWords, 
  generateRandomWord, 
  generateRandomWordHTML 
} from '../src/lib/word-utils';

describe('word-utils', () => {
  const testWords = ['ord', 'test', 'hus', 'bil', 'katt'];

  describe('shuffleArray', () => {
    it('should return an array of the same length', () => {
      const result = shuffleArray(testWords);
      expect(result).toHaveLength(testWords.length);
    });

    it('should contain all original elements', () => {
      const result = shuffleArray(testWords);
      testWords.forEach(word => {
        expect(result).toContain(word);
      });
    });

    it('should not modify the original array', () => {
      const original = [...testWords];
      shuffleArray(testWords);
      expect(testWords).toEqual(original);
    });

    it('should return a new array instance', () => {
      const result = shuffleArray(testWords);
      expect(result).not.toBe(testWords);
    });

    it('should handle empty arrays', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter of a lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should leave already capitalized strings unchanged', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle single character strings', () => {
      expect(capitalize('h')).toBe('H');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should capitalize only the first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });
  });

  describe('getRandomWords', () => {
    it('should return the requested number of words', () => {
      const result = getRandomWords(testWords, 3);
      expect(result).toHaveLength(3);
    });

    it('should return words from the original array', () => {
      const result = getRandomWords(testWords, 2);
      result.forEach(word => {
        expect(testWords).toContain(word);
      });
    });

    it('should handle requesting more words than available', () => {
      const result = getRandomWords(testWords, 10);
      expect(result).toHaveLength(testWords.length);
    });

    it('should handle requesting zero words', () => {
      const result = getRandomWords(testWords, 0);
      expect(result).toHaveLength(0);
    });

    it('should return unique words when possible', () => {
      const result = getRandomWords(testWords, 3);
      const unique = [...new Set(result)];
      expect(unique).toHaveLength(result.length);
    });
  });

  describe('generateRandomWord', () => {
    it('should generate a capitalized compound word with default 2 words', () => {
      const result = generateRandomWord(testWords);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBe(result[0].toUpperCase());
    });

    it('should generate word with specified number of components', () => {
      const result = generateRandomWord(testWords, 3);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should generate different results on multiple calls', () => {
      const results = new Set();
      for (let i = 0; i < 20; i++) {
        results.add(generateRandomWord(testWords));
      }
      // With 5 words and 2 combinations, we should get multiple unique results
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('generateRandomWordHTML', () => {
    it('should wrap the word in h1 tags', () => {
      const result = generateRandomWordHTML(testWords);
      expect(result).toMatch(/^<h1>.+<\/h1>$/);
    });

    it('should contain a capitalized word', () => {
      const result = generateRandomWordHTML(testWords);
      const wordMatch = result.match(/<h1>(.+)<\/h1>/);
      expect(wordMatch).toBeTruthy();
      if (wordMatch) {
        const word = wordMatch[1];
        expect(word[0]).toBe(word[0].toUpperCase());
      }
    });

    it('should respect the number of words parameter', () => {
      const result1 = generateRandomWordHTML(testWords, 1);
      const result2 = generateRandomWordHTML(testWords, 2);
      expect(result1).toMatch(/^<h1>.+<\/h1>$/);
      expect(result2).toMatch(/^<h1>.+<\/h1>$/);
    });
  });
});