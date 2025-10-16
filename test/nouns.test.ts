import { describe, it, expect } from 'vitest';
import { nouns } from '../src/lib/nouns';

describe('nouns', () => {
  describe('Norwegian locale sorting', () => {
    it('should sort words using Norwegian locale (nb-NO)', () => {
      // Find specific test cases that demonstrate Norwegian sorting
      const kaviarIndex = nouns.indexOf('kaviar');
      const kefirIndex = nouns.indexOf('kefir');
      const kålIndex = nouns.indexOf('kål');

      // In Norwegian alphabetical order, 'å' comes after other vowels
      // So the order should be: kaviar < kefir < kål
      expect(kaviarIndex).toBeGreaterThanOrEqual(0);
      expect(kefirIndex).toBeGreaterThanOrEqual(0);
      expect(kålIndex).toBeGreaterThanOrEqual(0);
      
      expect(kaviarIndex).toBeLessThan(kefirIndex);
      expect(kefirIndex).toBeLessThan(kålIndex);
    });

    it('should have all words in alphabetical order according to Norwegian locale', () => {
      // Create a sorted copy using Norwegian locale
      const sortedNouns = [...nouns].sort(new Intl.Collator('nb-NO').compare);
      
      // The nouns should already be sorted
      expect(nouns).toEqual(sortedNouns);
    });

    it('should be a non-empty array', () => {
      expect(nouns).toBeInstanceOf(Array);
      expect(nouns.length).toBeGreaterThan(0);
    });
  });
});
