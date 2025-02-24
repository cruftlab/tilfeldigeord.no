export function getRandomWords(words, n) {
  return words.sort(() => 0.5 - Math.random()).slice(0, n);
}

export function getRandomWordAsList(words, n) {
  const randomWords = getRandomWords(words, n);
  const ul = document.createElement('ul');
  randomWords.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    ul.appendChild(li);
  });
  return ul.outerHTML;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
