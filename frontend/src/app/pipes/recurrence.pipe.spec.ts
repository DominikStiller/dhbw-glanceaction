import { RecurrencePipe } from './recurrence.pipe';
import { Transaction } from '../models/transaction';

describe('RecurrencePipe', () => {
  let pipe: RecurrencePipe;

  beforeEach(() => {
    pipe = new RecurrencePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should do nothing if there is no recurrence', () => {
      // Recurrence disabled for all transactions
      const transactions: Transaction[] = [
        {
          id: 1,
          amount: 25,
          account: 5,
          category: 0,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
        {
          id: 2,
          amount: 53,
          account: 7,
          category: 2,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
      ];
      expect(pipe.transform(transactions)).toEqual(transactions);
    });

    it('should handle monthly recurrence', () => {
      const dateToString = (year, month) => new Date(year, month, 15).toISOString();

      // Recur 3 times at a monthly interval
      const transactions: Transaction[] = [{
        id: 1,
        amount: 25,
        account: 5,
        category: 0,
        timestamp: dateToString(2018, 11),
        notes: '',
        recurrence: 'm 3',
      }];
      const result = pipe.transform(transactions);

      // Only the month should change, handling new years
      expect(result[0].timestamp).toEqual(dateToString(2018, 11));
      expect(result[1].timestamp).toEqual(dateToString(2018, 12));
      expect(result[2].timestamp).toEqual(dateToString(2019, 1));
      expect(result[3].timestamp).toEqual(dateToString(2019, 2));
    });

    it('should handle custom recurrence', () => {
      const dateToString = (year, month, day) => new Date(year, month, day).toISOString();

      // Recur twice at a 6-day interval
      const transactions: Transaction[] = [{
        id: 1,
        amount: 25,
        account: 5,
        category: 0,
        timestamp: dateToString(2018, 4, 15),
        notes: '',
        recurrence: '6 2',
      }];
      const result = pipe.transform(transactions);

      expect(result[0].timestamp).toEqual(dateToString(2018, 4, 15));
      expect(result[1].timestamp).toEqual(dateToString(2018, 4, 21));
      expect(result[2].timestamp).toEqual(dateToString(2018, 4, 27));
    });

    it('should handle recurrence amounts correctly', () => {
      const transactions = [
        // Recur 5 times
        {
          id: 1,
          amount: 25,
          account: 5,
          category: 0,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '8 5',
        },
        // Recur 7 times
        {
          id: 2,
          amount: 53,
          account: 7,
          category: 2,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: 'm 7',
        },
        // Don't recur
        {
          id: 3,
          amount: -17.52,
          account: 7,
          category: 3,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 2',
        },
      ];
      expect(pipe.transform(transactions).length).toEqual(15);
    });
  });
});
