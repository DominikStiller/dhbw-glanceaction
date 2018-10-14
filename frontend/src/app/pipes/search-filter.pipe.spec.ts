import { TestBed } from '@angular/core/testing';

import { SearchFilterPipe } from './search-filter.pipe';
import { GlanceactionService } from '../services/glanceaction.service';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';

describe('SearchFilterPipe', () => {
  let pipe: SearchFilterPipe;

  const categoryWithCorrectName = 2;
  const correctName = 'mytestcategory';

  beforeEach(() => {
    const glanceactionService = {
      getCategory: (id): Category => {
        if (id === categoryWithCorrectName) {
          return {
            id: id,
            name: correctName,
            color: '#ffffff',
          };
        }
        return {
          id: id,
          name: 'wrongname',
          color: '#ffffff',
        };
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: GlanceactionService, useValue: glanceactionService },
      ],
    });
    pipe = new SearchFilterPipe(TestBed.get(GlanceactionService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should search notes', () => {
      // Search should only return this transaction
      const transactionWithNote = {
        id: 2,
        amount: 53,
        account: 7,
        category: 2,
        timestamp: new Date().toISOString(),
        notes: 'testnote',
        recurrence: '0 5',
      };
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
        transactionWithNote,
      ];

      expect(pipe.transform(transactions, 'testno')).toEqual([transactionWithNote]);
    });

    it('should search category name', () => {
      // Search should only return this transaction
      const transactionWithCategory = {
        id: 3,
        amount: 53,
        account: 7,
        category: categoryWithCorrectName,
        timestamp: new Date().toISOString(),
        notes: '',
        recurrence: '0 5',
      };
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
          amount: 89,
          account: 5,
          category: 4,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
        transactionWithCategory,
      ];

      expect(pipe.transform(transactions, 'testcategory')).toEqual([transactionWithCategory]);
    });
  });
});
