const puppeteer = require('puppeteer');
const fs = require('fs');

function generateCombinations(letters, wordLength) {
  const combinations = [];

  // Helper function to generate combinations recursively
  function generate(currentWord, remainingLength) {
    if (remainingLength === 0) {
      combinations.push(currentWord);
      return;
    }

    for (let i = 0; i < letters.length; i++) {
      const newWord = currentWord + letters[i];
      generate(newWord, remainingLength - 1);
    }
  }

  generate('', wordLength);
  return combinations;
}

async function searchWordMeaning(word) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Load the dictionary website for word lookup
  await page.goto(`https://www.dictionary.com/browse/${word}`, { waitUntil: 'networkidle0' });

  const wordExists = await page.evaluate(() => {
    return !!document.querySelector('.css-nnyc96');
  });

  let meaning = '';

  if (wordExists) {
    meaning = await page.evaluate(() => {
      const meanings = Array.from(document.querySelectorAll('.css-nnyc96'));
      return meanings.map((element) => element.innerText).join(', ');
    });
  }

  await browser.close();

  return meaning;
}

async function searchCombinations(startCombination = '') {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Define the letters and maximum word length
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const maxLength = 45;

  const combinationsWithMeaning = [];

  // Generate and search the combinations
  let resume = !startCombination;
  let foundStartCombination = !startCombination;

  for (let wordLength = 1; wordLength <= maxLength; wordLength++) {
    const combinations = generateCombinations(letters, wordLength);
    for (const combination of combinations) {
      if (resume && !foundStartCombination) {
        if (combination === startCombination) {
          foundStartCombination = true;
          resume = false;
        } else {
          continue;
        }
      }

      const meaning = await searchWordMeaning(combination);

      if (meaning) {
        combinationsWithMeaning.push({
          word: combination,
          meaning: meaning,
        });
      }

      console.log(`✅ SUCCESS: ${combination}: ${meaning.substring(0, 100)}...`);

      // Save combinations with meanings to a JSON file
      const filename = 'word_meaning.json';
      fs.writeFileSync(filename, JSON.stringify(combinationsWithMeaning, null, 2));
      console.log(`Word and meaning combinations saved to ${filename}`);
    }
  }

  await browser.close();
}

// Ask for the last generated combination
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the last generated combination (or leave empty to start from the beginning): ', (answer) => {
  rl.close();
  const startCombination = answer.trim();
  searchCombinations(startCombination);
});
