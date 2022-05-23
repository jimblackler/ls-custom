import range from 'lodash.range';
import {alea, PRNG} from 'seedrandom';
import {expect} from 'chai';
import {lsFind} from './lsFinder';
import {lsScan} from './lsScan';

function from(random: PRNG, n: number) {
  return Math.abs(random.int32()) % n;
}

function generateTestData(random: PRNG, length: number) {
  let winningNumber = from(random, length) + 1;
  let losingNumber = length - winningNumber;
  const winningSequence = [];
  const wholeSequence = [];
  let value = 0;
  while (wholeSequence.length < length) {
    const next = from(random, winningNumber + losingNumber);
    if (winningSequence.length && next >= winningNumber) {
      wholeSequence.push(from(random, value));
      losingNumber--;
    } else {
      wholeSequence.push(value);
      winningSequence.push(value);
      value++;
      winningNumber--;
    }
  }
  return {wholeSequence, winningSequence};
}

describe('lsCustom.test', () => {
  describe('Performs comparison tests', () => range(50).forEach((testNumber : number) =>
      it(`Test ${testNumber}`, () => {
        const testData = generateTestData(alea(testNumber.toString()), 10 + testNumber);
        console.log(testData);
        const out = lsFind(lsScan, testData.wholeSequence, (a, b) => b > a);
        expect(out).to.deep.equal(testData.winningSequence);
      }))
  );
});
