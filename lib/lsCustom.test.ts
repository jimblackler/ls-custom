import range from 'lodash.range';
import {alea, PRNG} from 'seedrandom';
import {expect} from 'chai';
import {lsFind} from './lsFinder';
import {lsScanBrute} from './lsScanBrute';
import {lsScanRapid} from './lsScanRapid';

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

function randomArray(random: PRNG, length: number, range: number) {
  const array: number[] = [];
  while (array.length < length) {
    array.push(from(random, range));
  }
  return array;
}

describe('lsCustom.test', () => {
  describe('Comparison tests', () => range(50).forEach((testNumber: number) =>
      it(`Test ${testNumber}`, () => {
        const testData = generateTestData(alea(testNumber.toString()), 10 + testNumber ** 1.7);
        console.log(testData);
        [lsScanBrute, lsScanRapid].forEach(lsFinder => {
          const label = (lsFinder as any).name;
          console.time(label);
          const out = lsFind(lsFinder, testData.wholeSequence, (a, b) => b > a);
          console.timeEnd(label);
          expect(out).to.deep.equal(testData.winningSequence);
        });
      }))
  );

  describe('Comparison tests with random data', () => range(10).forEach((testNumber: number) =>
      it(`Test ${testNumber}`, () => {
        const testData = randomArray(alea(testNumber.toString()), 3 + testNumber ** 1.9, 1000);
        console.log(testData);
        let reference: number[];
        [lsScanBrute, lsScanRapid].forEach(lsFinder => {
          const label = (lsFinder as any).name;
          console.time(label);
          const out = lsFind(lsFinder, testData, (a, b) => b > a);
          console.timeEnd(label);
          if (reference) {
            expect(out).to.deep.equal(reference);
          } else {
            reference = out;
          }
        });
      }))
  );
});
