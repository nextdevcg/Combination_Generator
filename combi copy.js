const fs = require('fs');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateCombinations(letters, wordLength, currentWord = '') {
  if (currentWord.length === wordLength) {
    // Save the combination to the file
    fs.appendFileSync('combinations.txt', currentWord + ',');

    // Log the combination
    console.log(currentWord);
    return;
  }

  for (let i = 0; i < letters.length; i++) {
    const newWord = currentWord + letters[i];

    // Delay before generating the next combination
    await delay(500);
    await generateCombinations(letters, wordLength, newWord);
  }
}

// Define the letters and maximum word length
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const maxLength = 12;

// Generate combinations for word lengths from 1 to maxLength
(async () => {
  for (let wordLength = 1; wordLength <= maxLength; wordLength++) {
    await generateCombinations(letters, wordLength);
  }

  console.log('Combinations saved to combinations.txt');
})();
