import { EmptyPipe } from './empty.pipe';

describe('EmptyPipe', () => {
  let pipe: EmptyPipe;

  beforeEach(() => {
    pipe = new EmptyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should return an empty array', () => {
      expect(pipe.transform([1, 2, 3])).toEqual([]);
    });
  });
});
