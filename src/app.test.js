import { getRandomWords, getRandomWordAsList, capitalize } from './utils.js';

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

describe('getRandomWordAsList', () => {
  it('should return an unordered list of random words', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const result = getRandomWordAsList(words, 3);
    expect(result).toContain('<ul>');
    expect(result).toContain('</ul>');
    expect(result).toContain('<li>');
    expect(result).toContain('</li>');
  });

  it('should return the correct number of list items', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const result = getRandomWordAsList(words, 3);
    const listItemCount = (result.match(/<li>/g) || []).length;
    expect(listItemCount).toBe(3);
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
