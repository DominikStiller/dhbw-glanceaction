import { TestBed } from '@angular/core/testing';

import { TotalAccountBalancePipe } from './total-account-balance.pipe';
import { GlanceactionService } from '../services/glanceaction.service';

describe('TotalAccountBalancePipe', () => {
  let pipe: TotalAccountBalancePipe;
  let glanceactionService;

  const expectedInitialAccountBalance = 783.54;

  beforeEach(() => {
    glanceactionService = {
      accounts: [
        { initialBalance: 789.54 },
        { initialBalance: -6 },
        { initialBalance: 0 },
      ],
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: GlanceactionService, useValue: glanceactionService },
      ],
    });

    pipe = new TotalAccountBalancePipe(TestBed.get(GlanceactionService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should calculate the total balance before transactions happened', () => {
      expect(pipe.transform([])).toBeCloseTo(expectedInitialAccountBalance, 2);
    });

    it('should calculate the total balance after transactions happened', () => {
      const transactions = [
        {
          id: 1,
          amount: 17.53,
          account: 5,
          category: 0,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
        {
          id: 2,
          amount: -975.84,
          account: 5,
          category: 0,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
        {
          id: 3,
          amount: 50,
          account: 5,
          category: 0,
          timestamp: new Date().toISOString(),
          notes: '',
          recurrence: '0 5',
        },
      ];

      const expected = expectedInitialAccountBalance + 17.53 - 975.84 + 50;
      expect(pipe.transform(transactions)).toBeCloseTo(expected, 2);
    });
  });
});
