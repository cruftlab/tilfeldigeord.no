import { describe, it, expect } from 'vitest';
import { verbs } from '../src/lib/verbs';

describe('verbs', () => {
  describe('Norwegian locale sorting', () => {
    it('should sort words using Norwegian locale (nb-NO)', () => {
      // Verify that verbs are sorted alphabetically
      const sortedVerbs = [...verbs].sort(new Intl.Collator('nb-NO').compare);
      expect(verbs).toEqual(sortedVerbs);
    });

    it('should have all words in alphabetical order according to Norwegian locale', () => {
      // Create a sorted copy using Norwegian locale
      const sortedVerbs = [...verbs].sort(new Intl.Collator('nb-NO').compare);
      
      // The verbs should already be sorted
      expect(verbs).toEqual(sortedVerbs);
    });

    it('should be a non-empty array', () => {
      expect(verbs).toBeInstanceOf(Array);
      expect(verbs.length).toBeGreaterThan(0);
    });
  });
});
