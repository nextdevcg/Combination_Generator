# Combination Generator
Read the article [Here in Dev.to](https://dev.to/nextdevcg/generating-combinations-with-nodejs-3f77)
```markdown
# Combination Generator

This combination generator is a Node.js application that generates combinations of characters and logs them to the console and a file. The application allows you to resume generating combinations from where you left off, and provides options for customizing the console log appearance.

run 'node combi.js' to generate combinations, it will populate 'combinations.txt' file.

run 'node findWords.js' to generate and search in dictonary, it will populate 'word_meaning.json' file.

run 'node isword.js' it is a little game, it prompts random word, if you say it is a valid word it saves the word in 'words.txt' file.

## Features

- Generates combinations of characters
- Supports resuming from the last generated combination
- Customizes the console log appearance with random colors, font styles (bold, italic, underline), and increased font size
- Saves the generated combinations to a file

## Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/nextdevcg/Combination_Generator.git
   ```

2. Install the dependencies:

   ```shell
   cd Combination_Generator
   npm install
   ```

3. Customize the options (if desired):

   - Modify the `letters` variable in `index.js` to define the characters to generate combinations from.
   - Adjust the `maxLength` variable in `index.js` to set the maximum length of the generated combinations.
   - Modify the delay duration in the `delay` function in `index.js` to control the delay between each combination generation.

4. Run the application:

   ```shell
   node combi.js
   ```

   The application will start generating combinations and logging them to the console. The combinations will also be saved to the `combinations.txt` file in the project directory.

5. To pause and resume the combination generation:

   - Press `Ctrl + C` to stop the application.
   - Run the application again using the same command (`node index.js`).

   The application will read the last generated combination from the `combinations.txt` file and resume generating combinations from the next iteration.

## Attribution

This code was created using ChatGPT, a language model developed by OpenAI. ChatGPT is trained on a diverse range of internet text, including programming code, to provide natural language responses and assist with code-related tasks.

## License

This project is licensed under the [MIT License](LICENSE).
```
Prompted by Titas Mallick.
```

# কম্বিনেশন জেনারেটর: অক্ষর কম্বিনেশন তৈরি করার একটি কোড

সফটওয়ার উন্নতির জগতে অক্ষর কম্বিনেশন তৈরি করা সাধারণত একটি মার্কেটিং সমস্যা হিসাবে পরিচিত। অনেক সময়, প্রোগ্রামারদের এমন একটি প্রয়োজন হতে পারে যেটি করে সকল সম্ভাব্য অক্ষর কম্বিনেশন তৈরি করে সেগুলি পরিচ্ছন্নভাবে সংরক্ষণ করা যায়। এটি উদাহরণ হিসাবে ই-মেইল পাসওয়ার্ড তৈরি, ক্র্যাকিং হ্যাশ ফাংশন পরীক্ষা, বা সাধারণত পরিচ্ছন্নভাবে সংরক্ষিত করা একটি ডাটাবেসের ইনডেক্সিং সিস্টেম তৈরি করার জন্য কাজে লাগতে পারে।

উপরের কোডটি এমন একটি কম্বিনেশন জেনারেটর প্রদর্শন করে যা অক্ষরের একটি প্রাকৃতিক ক্রমে বিভিন্ন দৈর্ঘ্যে কম্বিনেশন তৈরি করে তা সংরক্ষণ এবং প্রদর্শন করে। এটি একটি নির্দিষ্ট অক্ষর সে

ট ব্যবহার করে এবং একটি ম্যাক্সিমাম শব্দ দৈর্ঘ্য নির্ধারণ করে।

এটি সংক্ষেপে পর্যালোচনা করা যাকঃ

```javascript
const fs = require('fs');
const chalk = require('chalk');

// একটি ডিলেই ফাংশন যা নির্দিষ্ট সময়ের জন্য বিলম্ব প্রদান করে
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// একটি যেকোনো শৈলী প্রদান করে
function getRandomStyle() {
  const styles = ['italic', 'underline', 'inverse', 'bold'];
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
}

// সমস্ত কম্বিনেশন তৈরি করার জন্য রিকার্সিভভাবে কল করে
async function generateCombinations(letters, wordLength, currentWord = '') {
  if (currentWord.length === wordLength) {
    // কম্বিনেশনটি ফাইলে সংরক্ষণ করা হচ্ছে
    fs.appendFileSync('combinations.txt', currentWord + ',');

    // কনসোল খালি করা হচ্ছে
    console.clear();

    // একটি এলাকায় যেকোনো র‍্যান্ডম রঙ তৈরি করা হচ্ছে
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // একটি যেকোনো শৈলী তৈরি করা হচ্ছে
    const randomStyle = getRandomStyle();

    // ফন্টের শৈলী, রঙ এবং সাইজ প্রয়োগ করা হচ্ছে
    const styledMessage = chalk.rgb(255, 255, 255).bgHex(randomColor)[randomStyle].bold(currentWord);
    console.log(styledMessage);
    return;
  }

  for (let i = 0; i < letters.length; i++) {
    const newWord = currentWord + letters[i];

    // পরবর্তী কম্বিন

েশন তৈরি করার আগে বিলম্ব প্রদান করা হচ্ছে
    await delay(1);

    // পরবর্তী কম্বিনেশন তৈরি করতে ফাংশনটি আবারও রিকার্সিভভাবে কল করা হচ্ছে
    await generateCombinations(letters, wordLength, newWord);
  }
}

// অক্ষরগুলি এবং সর্বাধিক শব্দ দৈর্ঘ্য নির্ধারণ করা হচ্ছে
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const maxLength = 45;

// console.log ফন্ট আকার বৃদ্ধি করা হচ্ছে
console.log('\n');
console.log('\x1b[1m');

// যদি কম্বিনেশন ফাইল বিদ্যমান হয়
if (fs.existsSync('combinations.txt')) {
  // ফাইলের সামগ্রী পড়ে নেওয়া হচ্ছে এবং শেষ তৈরি কম্বিনেশনটি নিয়ে আসা হচ্ছে
  const combinations = fs.readFileSync('combinations.txt', 'utf8');
  const lastCombination = combinations.split(',').filter(Boolean).pop();

  // পরবর্তী শব্দের দৈর্ঘ্য এবং শুরুর কম্বিনেশন নির্ধারণ করা হচ্ছে
  let nextWordLength = 1;
  let nextCombination = '';

  if (lastCombination) {
    nextWordLength = lastCombination.length;
    nextCombination = lastCombination;

    // কম্বিনেশনে শেষ নন-'z' অক্ষরের স্থানটি খুঁজে বের করা হচ্ছে
    let lastNonZIndex = nextCombination.length - 1;
    while (lastNonZIndex >= 0 && nextCombination[lastNonZIndex] === 'z') {
      lastNonZIndex--;
    }

    if (lastNonZIndex >= 0) {
      // শেষ নন-'z' অক্ষরটির মান বৃদ্ধি করে এবং পরবর্ত

ী কম্বিনেশনে যোগ করা হচ্ছে
      const lastNonZChar = nextCombination[lastNonZIndex];
      const nextChar = String.fromCharCode(lastNonZChar.charCodeAt(0) + 1);
      nextCombination =
        nextCombination.substring(0, lastNonZIndex) +
        nextChar +
        nextCombination.substring(lastNonZIndex + 1);
    } else {
      // যদি শেষ নন-'z' অক্ষর না পাওয়া যায় তবে পরবর্তী শব্দের দৈর্ঘ্য বৃদ্ধি করা হচ্ছে
      nextWordLength++;
      nextCombination = 'a'.repeat(nextWordLength);
    }
  }

  console.log(chalk.green('পূর্বের শেষ কম্বিনেশনঃ'), lastCombination);
  console.log(chalk.green('পরবর্তী শব্দের দৈর্ঘ্যঃ'), nextWordLength);
  console.log(chalk.green('পরবর্তী কম্বিনেশনঃ'), nextCombination);
}

console.log(chalk.yellow('\nকম্বিনেশন তৈরি করা হচ্ছে...'));
console.log(chalk.yellow('বন্ধ করতে Ctrl+C চাপুন।'));

// সমস্ত কম্বিনেশন তৈরি করার জন্য ফাংশনটি কল করা হচ্ছে
await generateCombinations(letters, maxLength);

console.log(chalk.green('\nকম্বিনেশন তৈরি সম্পন্ন হয়েছে!'));
console.log(chalk.yellow('combinations.txt ফাইলে সংরক্ষিত হয়েছে।'));

```

উপরের কোডটি একটি কম্বিনেশন জেনারেটর প্রদর্শন করে যা অক্ষরের একটি প্রাকৃতিক ক্রমে বিভিন্ন দৈর্ঘ্যে কম্বিনেশন তৈরি করে তা সংরক্ষণ এবং প্রদর্শন করে। এটি একটি নির্দিষ্ট অক্ষর সে

টের উপর ভিত্তি করে কম্বিনেশন তৈরি করে এবং এটি ফাইলে সংরক্ষণ করে যা 'combinations.txt' নামে থাকে। সংরক্ষিত কম্বিনেশন গুলির জন্য শেষ কম্বিনেশন, পরবর্তী শব্দের দৈর্ঘ্য এবং পরবর্তী কম্বিনেশন প্রদর্শন করে ফ্রম্যাকের মাধ্যমে।

আপনি পূর্বে জেনারেট করা কম্বিনেশন গুলির তথ্য দেখতে পারেন এবং পরবর্তী কম্বিনেশনের জন্য শব্দের দৈর্ঘ্য নির্ধারণ করতে পারেন। ফাইলে সংরক্ষিত কম্বিনেশন গুলি যোগ করার জন্য রিকার্সিভভাবে ফাংশনটি কল করা হয় এবং প্রতিটি কম্বিনেশনের জন্য কনসোলে রঙিন এবং শৈলীয় টেক্সট প্রদর্শন করা হয়।

এই কোডটি ব্যবহার করে আপনি সহজেই প্রাকৃতিক ক্রমে শব্দের কম্বিনেশন তৈরি করতে পারবেন এবং এগুলির সাথে আপনার পছন্দসই শৈলী প্রয়োগ করতে পারেন। কার্যকর এবং

 ব্যবহারকারী-বন্ধনসহ, এই কোডটি আপনাকে উপস্থাপন ও অধিকারপ্রাপ্ত কম্বিনেশন তৈরি করতে সহায়তা করবে।

 ```
 কোডটি Titas Mallick দ্বারা প্রদত্ত এবং ChatGPT দ্বারা তৈরি।
 ```