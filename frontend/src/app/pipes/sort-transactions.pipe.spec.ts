import { SortTransactionsPipe } from './sort-transactions.pipe';
import { Transaction } from '../models/transaction';

describe('SortTransactionsPipe', () => {
  let pipe: SortTransactionsPipe;

  beforeEach(() => {
    pipe = new SortTransactionsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should sort an unsorted list', () => {
      const transactions: Transaction[] = [
        {
          id: 1,
          amount: 25,
          account: 5,
          category: 0,
          timestamp: new Date(2018, 5, 8).toISOString(),
          notes: '',
          recurrence: '0 5',
        },
        {
          id: 2,
          amount: 89,
          account: 5,
          category: 4,
          timestamp: new Date(2018, 5, 6).toISOString(),
          notes: '',
          recurrence: '0 5',
        },
      ];
      expect(pipe.transform(transactions)).toEqual(transactions.reverse());
    });
  });
});
