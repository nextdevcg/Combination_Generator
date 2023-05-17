const fs = require('fs');
const chalk = require('chalk');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomStyle() {
  const styles = ['bold', 'italic', 'underline'];
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
}

function getRandomCapitalization(word) {
  let capitalizedWord = '';
  for (let i = 0; i < word.length; i++) {
    const randomCase = Math.random() < 0.5 ? 'toUpperCase' : 'toLowerCase';
    capitalizedWord += word[i][randomCase]();
  }
  return capitalizedWord;
}

async function generateCombinations(letters, wordLength, currentWord = '') {
  if (currentWord.length === wordLength) {
    // Save the combination to the file
    fs.appendFileSync('combinations.txt', currentWord + ',');

    // Clear the console
    console.clear();

    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Generate a random style
    const randomStyle = getRandomStyle();

    // Generate a random capitalization
    const capitalizedWord = getRandomCapitalization(currentWord);

    // Apply font style, color, and size
    const styledMessage = chalk.rgb(255, 255, 255).bgHex(randomColor)[randomStyle].bold(capitalizedWord);
    console.log(styledMessage);
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

// Increase the font size of console.log
console.log('\n');
console.log('\x1b[1m');

// Generate combinations for word lengths from 1 to maxLength
(async () => {
  for (let wordLength = 1; wordLength <= maxLength; wordLength++) {
    await generateCombinations(letters, wordLength);
  }

  console.log('Combinations saved to combinations.txt');
})();
