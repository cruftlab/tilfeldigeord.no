// Function to get random words from the list
export function getRandomWords(words: string[], n: number): string[] {
  return [...words].sort(() => 0.5 - Math.random()).slice(0, n);
}

// Function to concatenate random words and capitalize
export function getConcatenatedRandomWord(words: string[], n: number): string {
  const randomWords = getRandomWords(words, n);
  return capitalize(randomWords.join(""));
}

// Helper to capitalize strings
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Client-side functionality
export function initializeClientSide(words: string[]) {
  function updatePageWithRandomWord() {
    const word = getConcatenatedRandomWord(words, 2);
    document.getElementById("randomWord")!.innerHTML = `<h1>${word}</h1><p><a href="#" id="newWord">Nytt ord</a></p>`;
    document.getElementById("newWord")?.addEventListener("click", handleNewWordClick);
  }

  function handleNewWordClick(e: Event) {
    e.preventDefault();
    updatePageWithRandomWord();
  }

  // Update random words when page loads and when "Nytt ord" is clicked
  document.addEventListener("DOMContentLoaded", updatePageWithRandomWord);
  document.getElementById("newWord")?.addEventListener("click", handleNewWordClick);
}
