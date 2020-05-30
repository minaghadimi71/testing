import {StrengthPipe} from "./strength.pipe";

describe('strength pipe', () => {
  let pipeComponent: StrengthPipe;
  beforeEach(() => {
    pipeComponent = new StrengthPipe();
  })
  it('should display week if strength is 5', () => {
    let value = 5;
    let strength = pipeComponent.transform(value);
    expect(strength).toEqual('5 (weak)');
  })
  it('should display strong if strength is 11', () => {
    let value = 11;
    let strength = pipeComponent.transform(value);
    expect(strength).toEqual('11 (strong)');
  })
  it('should display unbelievable if strength is 22', () => {
    let value = 22;
    let strength = pipeComponent.transform(value);
    expect(strength).toEqual('22 (unbelievable)');
  })
})
