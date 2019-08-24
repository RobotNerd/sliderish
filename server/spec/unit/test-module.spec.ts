import { sample } from 'src/test-module';

describe('The sample function', () => {

  it('returns "sample"', () => {
    expect(sample()).toEqual('sample');
  });

});
