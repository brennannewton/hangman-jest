const { randomlySelectWord } = require('./lib');
const { playHangman } = require('./hangman');

const wordBank = [
  'javascript',
  'code',
  'talentpath',
  'puppy',
  'react',
  'computer',
];

playHangman(randomlySelectWord(wordBank));
