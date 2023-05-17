const fs = require('fs');
const chalk = require('chalk');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomStyle() {
  const styles = ['italic', 'underline', 'inverse', 'bold'];
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
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

    // Apply font style, color, and size
    const styledMessage = chalk.rgb(255, 255, 255).bgHex(randomColor)[randomStyle].bold(currentWord);
    console.log(styledMessage);
    return;
  }

  for (let i = 0; i < letters.length; i++) {
    const newWord = currentWord + letters[i];

    // Delay before generating the next combination
    await delay(1);

    // Call the function recursively to generate the next combination
    await generateCombinations(letters, wordLength, newWord);
  }
}

// Define the letters and maximum word length
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const maxLength = 45;

// Increase the font size of console.log
console.log('\n');
console.log('\x1b[1m');

// Check if a combinations file exists
if (fs.existsSync('combinations.txt')) {
  // Read the file content and get the last generated combination
  const combinations = fs.readFileSync('combinations.txt', 'utf8');
  const lastCombination = combinations.split(',').filter(Boolean).pop();

  // Calculate the next word length and starting combination to resume from
  let nextWordLength = 1;
  let nextCombination = '';

  if (lastCombination) {
    nextWordLength = lastCombination.length;
    nextCombination = lastCombination;

    // Find the index of the last non-'z' character in the combination
    let lastNonZIndex = nextCombination.length - 1;
    while (lastNonZIndex >= 0 && nextCombination[lastNonZIndex] === 'z') {
      lastNonZIndex--;
    }

    if (lastNonZIndex >= 0) {
      // Increment the last non-'z' character and reset the following characters to 'a'
      const nextChar = String.fromCharCode(nextCombination.charCodeAt(lastNonZIndex) + 1);
      nextCombination = nextCombination.slice(0, lastNonZIndex) + nextChar + 'a'.repeat(nextCombination.length - lastNonZIndex - 1);
    } else {
      // If all characters are 'z', increase the word length
      nextWordLength++;
      nextCombination = letters.slice(0, 2).join('').repeat(nextWordLength);
    }
  }

  // Resume generating combinations from the next starting combination
  (async () => {
    let isResuming = false;
    for (let wordLength = nextWordLength; wordLength <= maxLength; wordLength++) {
      if (isResuming) {
        isResuming = false;
        nextCombination = nextCombination.slice(0, -1);
      }

      await generateCombinations(letters, wordLength, nextCombination);

      if (nextCombination.length === wordLength) {
        const index = letters.indexOf(nextCombination.slice(-1));
        if (index === letters.length - 1) {
          nextCombination = nextCombination.slice(0, -1) + letters[0];
          isResuming = true;
        } else {
          nextCombination = nextCombination.slice(0, -1) + letters[index + 1];
        }
      }
    }

    console.log('Combinations saved to combinations.txt');
  })();
} else {
  // Generate combinations for word lengths from 1 to maxLength
  (async () => {
    for (let wordLength = 1; wordLength <= maxLength; wordLength++) {
      await generateCombinations(letters, wordLength);
    }

    console.log('Combinations saved to combinations.txt');
  })();
}
