import { describe, it, expect } from 'vitest';
import { 
  shuffleArray, 
  capitalize, 
  getRandomWords, 
  getRandomWordsWithFixed,
  generateRandomWord,
  createCompoundWord,
  switchWordOrder,
  createWordParts,
  type WordPart,
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

  describe('getRandomWordsWithFixed', () => {
    it('should return the requested number of words', () => {
      const result = getRandomWordsWithFixed(testWords, 'hus', 3);
      expect(result).toHaveLength(3);
    });

    it('should include the fixed word', () => {
      const result = getRandomWordsWithFixed(testWords, 'hus', 3);
      expect(result).toContain('hus');
    });

    it('should return only the fixed word when n is 1', () => {
      const result = getRandomWordsWithFixed(testWords, 'hus', 1);
      expect(result).toEqual(['hus']);
    });

    it('should return empty array when n is 0', () => {
      const result = getRandomWordsWithFixed(testWords, 'hus', 0);
      expect(result).toEqual([]);
    });

    it('should handle fixed word not in the list', () => {
      const result = getRandomWordsWithFixed(testWords, 'notexist', 2);
      expect(result).toHaveLength(2);
      expect(result).not.toContain('notexist');
      result.forEach(word => {
        expect(testWords).toContain(word);
      });
    });

    it('should place fixed word at random positions', () => {
      const positions = new Set();
      for (let i = 0; i < 20; i++) {
        const result = getRandomWordsWithFixed(testWords, 'hus', 3);
        const position = result.indexOf('hus');
        positions.add(position);
      }
      // With 3 words, we should see at least 2 different positions across 20 tries
      expect(positions.size).toBeGreaterThan(1);
    });

    it('should return unique words when possible', () => {
      const result = getRandomWordsWithFixed(testWords, 'hus', 3);
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

  describe('createCompoundWord', () => {
    it('should create a capitalized compound word from word parts', () => {
      const wordParts = ['hus', 'bil'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Hus&shy;bil');
    });

    it('should capitalize the first letter', () => {
      const wordParts = ['test', 'ord'];
      const result = createCompoundWord(wordParts);
      expect(result[0]).toBe('T');
    });

    it('should handle single word', () => {
      const result = createCompoundWord(['ord']);
      expect(result).toBe('Ord');
    });

    it('should handle multiple words', () => {
      const wordParts = ['ett', 'to', 'tre'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Et&shy;to&shy;tre');
    });

    it('should apply combining rule when first word ends with double consonant and second starts with same consonant', () => {
      const wordParts = ['gebiss', 'skandale'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Gebis&shy;skandale');
    });

    it('should apply combining rule for anorakk + kefir', () => {
      const wordParts = ['anorakk', 'kefir'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Anorak&shy;kefir');
    });

    it('should not apply rule when consonants do not match', () => {
      const wordParts = ['hus', 'bil'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Hus&shy;bil');
    });

    it('should not apply rule when first word does not end with double consonant', () => {
      const wordParts = ['test', 'ord'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Test&shy;ord');
    });

    it('should apply combining rule for each adjacent pair in multiple words', () => {
      const wordParts = ['ball', 'lett', 'tekst'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Bal&shy;let&shy;tekst');
    });

    it('should handle words where rule does not apply', () => {
      const wordParts = ['katt', 'hus'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('Katt&shy;hus');
    });

    it('should handle empty array', () => {
      const result = createCompoundWord([]);
      expect(result).toBe('');
    });

    it('should work with single-letter words like "I"', () => {
      const wordParts = ['i', 'glo'];
      const result = createCompoundWord(wordParts);
      expect(result).toBe('I&shy;glo');
    });
  });

  describe('createWordParts', () => {
    it('should create WordPart objects with original and combined forms', () => {
      const wordParts = ['gebiss', 'skandale'];
      const result = createWordParts(wordParts);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ original: 'gebiss', combined: 'gebis' });
      expect(result[1]).toEqual({ original: 'skandale', combined: 'skandale' });
    });

    it('should preserve original forms for links', () => {
      const wordParts = ['anorakk', 'kefir'];
      const result = createWordParts(wordParts);
      
      // Original forms are preserved
      expect(result[0].original).toBe('anorakk');
      expect(result[1].original).toBe('kefir');
      
      // Combined forms apply rules
      expect(result[0].combined).toBe('anorak');
      expect(result[1].combined).toBe('kefir');
    });

    it('should not modify words when no rule applies', () => {
      const wordParts = ['hus', 'bil'];
      const result = createWordParts(wordParts);
      
      expect(result[0]).toEqual({ original: 'hus', combined: 'hus' });
      expect(result[1]).toEqual({ original: 'bil', combined: 'bil' });
    });

    it('should handle single-letter words correctly', () => {
      const wordParts = ['i', 'glo'];
      const result = createWordParts(wordParts);
      
      expect(result[0]).toEqual({ original: 'i', combined: 'i' });
      expect(result[1]).toEqual({ original: 'glo', combined: 'glo' });
    });

    it('should use sliding window for multiple words', () => {
      const wordParts = ['ball', 'lett', 'tekst'];
      const result = createWordParts(wordParts);
      
      expect(result[0]).toEqual({ original: 'ball', combined: 'bal' });
      expect(result[1]).toEqual({ original: 'lett', combined: 'let' });
      expect(result[2]).toEqual({ original: 'tekst', combined: 'tekst' });
    });

    it('should handle empty array', () => {
      const result = createWordParts([]);
      expect(result).toEqual([]);
    });

    it('should handle single word', () => {
      const result = createWordParts(['ord']);
      expect(result).toEqual([{ original: 'ord', combined: 'ord' }]);
    });
  });

  describe('switchWordOrder', () => {
    it('should reverse the order of two words', () => {
      const wordParts = ['hus', 'bil'];
      const result = switchWordOrder(wordParts);
      expect(result).toEqual(['bil', 'hus']);
    });

    it('should not modify the original array', () => {
      const wordParts = ['hus', 'bil'];
      const original = [...wordParts];
      switchWordOrder(wordParts);
      expect(wordParts).toEqual(original);
    });

    it('should handle multiple words', () => {
      const wordParts = ['ett', 'to', 'tre'];
      const result = switchWordOrder(wordParts);
      expect(result).toEqual(['tre', 'to', 'ett']);
    });

    it('should handle single word', () => {
      const result = switchWordOrder(['ord']);
      expect(result).toEqual(['ord']);
    });

    it('should handle empty array', () => {
      const result = switchWordOrder([]);
      expect(result).toEqual([]);
    });
  });
});