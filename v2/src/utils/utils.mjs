function getRandomWords(words, n) {
  return words.sort(() => 0.5 - Math.random()).slice(0, n);
}

function getConcatenatedRandomWord(words, n) {
  const randomWords = getRandomWords(words, n);
  return capitalize(randomWords.join(""));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Make functions available globally for the browser
if (typeof window !== 'undefined') {
  window.getRandomWords = getRandomWords;
  window.getConcatenatedRandomWord = getConcatenatedRandomWord;
  window.capitalize = capitalize;
}

// Export for tests
export { getRandomWords, getConcatenatedRandomWord, capitalize };
