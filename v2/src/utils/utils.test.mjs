import { getRandomWords, getConcatenatedRandomWord, capitalize } from './utils.mjs';

describe('getRandomWords', () => {
  it('should return the correct number of random words', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const result = getRandomWords(words, 3);
    expect(result.length).toBe(3);
  });

  it('should return different words each time', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const result1 = getRandomWords(words, 3);
    const result2 = getRandomWords(words, 3);
    expect(result1).not.toEqual(result2);
  });
});

describe('getConcatenatedRandomWord', () => {
  it('should return a concatenated and capitalized string', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const result = getConcatenatedRandomWord(words, 3);
    expect(typeof result).toBe('string');
    expect(result[0]).toBe(result[0].toUpperCase());
    expect(result.length).toBeGreaterThan(0);
  });

  it('should concatenate the correct number of words', () => {
    const words = ['a', 'b', 'c', 'd', 'e'];
    const result = getConcatenatedRandomWord(words, 3);
    // Since each word is 1 character, the result should be 3 characters (plus 1 for capitalization)
    expect(result.length).toBe(3);
  });
});

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    const str = 'hello';
    const result = capitalize(str);
    expect(result).toBe('Hello');
  });

  it('should not change the rest of the string', () => {
    const str = 'hello';
    const result = capitalize(str);
    expect(result).toBe('Hello');
  });

  it('should handle empty strings', () => {
    const str = '';
    const result = capitalize(str);
    expect(result).toBe('');
  });
});
