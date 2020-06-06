import {ReversePipe} from "./reverse.pipe";

describe('reversePipe', () => {
  it('reversePipe should work', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh')
  })
})
