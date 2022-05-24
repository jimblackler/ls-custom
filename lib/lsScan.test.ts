import {alea} from 'seedrandom';
import {expect} from 'chai';
import {lsFind} from './lsFinder';
import {lsScanBrute} from './lsScanBrute';

describe('lsScan.test', () => {
  it('Works on basic data', () => {
    [{data: [1, 2, 3], expected: [1, 2, 3]}].forEach(test => {
      describe(`${test.data} -> ${test.expected}`, () =>
          expect(lsFind(lsScanBrute, test.data, (a, b) => b > a)).to.deep.equal(test.expected));
    });
  })
});
