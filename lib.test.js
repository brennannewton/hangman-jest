/* eslint-disable no-console */
const readlineSync = require('readline-sync');

const {
  stringify,
  createBlankWordArray,
  isWordSolved,
  print,
  randomlySelectWord,
  askForALetter,
  validateInput,
} = require('./lib');

describe('stringify', () => {
  it('should convert arbitrary string array to string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('hello');
  });

  it('should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('Hello');

    const allCapsArray = ['H', 'E', 'L', 'L', 'O'];
    expect(stringify(allCapsArray)).toBe('HELLO');
  });

  it('should maintain white-space', () => {
    const stringArray = 'Hello world'.split('');
    const result = stringify(stringArray);

    expect(result).toBe('Hello world');
  });

  it('should return empty string given empty array', () => {
    const stringArray = [];
    const result = stringify(stringArray);

    expect(result).toBe('');
  });

  it('should properly handle array entries with multiple characters', () => {
    const stringArray = ['H', 'el', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('Hello');
  });

  it('should handle no input', () => {
    expect(stringify()).toBe('');
  });
});

describe('createBlankWordArray', () => {
  it('should return an array of arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);
    expect(result.length).toBe(10);
    expect(result).toHaveLength(10);
    expect(result.every(letter => letter === '_')).toBeTruthy();
  });

  it('should return an empty array when passed 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });

  it('should gracefully handle undefined input', () => {
    const result = createBlankWordArray();
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should return empty array on non-number inputs', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
    expect(createBlankWordArray({})).toHaveLength(0);
    expect(createBlankWordArray(true)).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return false if there is at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBe(false);
    expect(result).toBeFalsy();
    expect(result).not.toBeTruthy();
  });

  it('should return true if there are no underscores', () => {
    const input = 'abc'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });

  it('should throw a TypeError if passed undefined input', () => {
    expect.assertions(1);
    try {
      isWordSolved();
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }
    // expect(() => isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log output to the console', () => {
    console.log = jest.fn(); // mock clg function
    print('Act up you could get snatched up');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Act up you could get snatched up');
    console.log.mockClear(); // clear mock state
  });

  it('should output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('');
  });
});

xdescribe('randomlySelectWord', () => {
  // Math.random = jest.fn(() => 0.5);
  // Math.random = jest.fn().mockReturnValue(0.5);

  it('should be able to return any word in the array', () => {
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);
    const result1 = randomlySelectWord(['first', 'second', 'third']);
    const result2 = randomlySelectWord(['first', 'second', 'third']);
    const result3 = randomlySelectWord(['first', 'second', 'third']);
    expect(result1).toBe('first');
    expect(result2).toBe('second');
    expect(result3).toBe('third');
  });
});

jest.mock('readline-sync');
describe('askForALetter', () => {
  it('should return that the letter user input', () => {
    readlineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});

describe('validateInput', () => {
  it('should only return a single letter given a single letter', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });
  it('should retrun the first character if it receives a string', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });
  it('should throw an error with a message of "Invalid input" if it receives a number', () => {
    expect.assertions(2);
    try {
      validateInput(2);
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      expect(err.message).toBe('Invalid input');
    }
  });
  it('should throw an error if it receives undefined input', () => {
    expect(validateInput).toThrow(TypeError);
  });
  it('should throw an error if it receives a non-letter charcter', () => {
    expect(() => {
      validateInput('2');
    }).toThrow('Invalid input');
    expect(() => {
      validateInput('.');
    }).toThrow('Invalid input');
  });
});
