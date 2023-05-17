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