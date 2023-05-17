const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharacter() {
  const charCode = getRandomInt(97, 122);
  return String.fromCharCode(charCode);
}

function generateRandomCombination() {
  const length = getRandomInt(1, 45);
  let combination = '';
  for (let i = 0; i < length; i++) {
    combination += getRandomCharacter();
  }
  return combination;
}

function getRandomStyle() {
  const styles = ['bold', 'italic', 'underline'];
  const randomIndex = getRandomInt(0, styles.length - 1);
  return styles[randomIndex];
}

function promptForWord() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const combination = generateRandomCombination();

  const randomStyle = getRandomStyle();
  const randomColor = chalk.rgb(
    getRandomInt(0, 255),
    getRandomInt(0, 255),
    getRandomInt(0, 255)
  );

  rl.question(`Is ${randomColor[randomStyle](combination)} a word? (y/n): `, (answer) => {
    if (answer.toLowerCase() === 'y') {
      saveWord(combination);
      console.log(`Word ${randomColor[randomStyle](combination)} has been saved.`);
    } else {
      console.log(`Word ${randomColor[randomStyle](combination)} not saved.`);
    }

    rl.close();
    promptForWord();
  });
}

function saveWord(word) {
  let words = [];
  if (fs.existsSync('words.txt')) {
    const wordsData = fs.readFileSync('words.txt', 'utf8');
    words = JSON.parse(wordsData);
  }

  words.push(word);
  fs.writeFileSync('words.txt', JSON.stringify(words, null, 2));
}

promptForWord();
