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
