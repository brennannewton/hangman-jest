const {
  createBlankWordArray,
  isWordSolved,
  print,
  stringify,
  askForALetter,
  wordIncludesLetter,
  fillInGuessedLetters,
} = require('./lib');

/**
 * Recursive function that plays one round (a single guess) of hangman
 * @param {string} targetWord the word to guess
 * @param {string[]} guessedWord array of letters and blanks containing the state of the guessed word up to this point
 * @param {number} strikes total strikes the user has received
 * @param {number} maxStrikes total strikes the user is allowed
 */
exports.playHangman = (
  targetWord = '',
  guessedWord = createBlankWordArray(targetWord.length),
  strikes = 0,
  maxStrikes = 5
) => {
  // base case (win)
  if (isWordSolved(guessedWord)) {
    print(`You win! The word was ${targetWord}`);
    return;
  }
  // base case (loss)
  if (strikes >= maxStrikes) {
    print(`You lose! The word was ${targetWord}`);
    return;
  }

  print(stringify(guessedWord));

  const guessedLetter = askForALetter();

  if (wordIncludesLetter(targetWord, guessedLetter)) {
    print('Good guess!');
    exports.playHangman(
      targetWord,
      fillInGuessedLetters(guessedLetter, guessedWord, targetWord),
      strikes,
      maxStrikes
    );
  } else {
    print(`Wrong! You have ${maxStrikes - (strikes + 1)} strikes left`);
    exports.playHangman(targetWord, guessedWord, strikes + 1, maxStrikes);
  }
};
