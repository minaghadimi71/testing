describe('my first test', () => {
  let sue;
  beforeEach(() => {
    sue = {}
  })
  it('should be true if true', () => {
    //arrange
    sue.a = false;
    //act
    sue.a = true;
    //assert
    expect(sue.a).toBeTruthy();
  })
})
