import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Account } from '../models/account';
import { AccountNamePipe } from './account-name.pipe';
import { GlanceactionService } from '../services/glanceaction.service';

describe('AccountNamePipe', () => {
  let pipe: AccountNamePipe;

  const existingId = 13;

  beforeEach(() => {
    const glanceactionService = {
      getAccount: (id): Account => {
        if (id === existingId) {
          return {
            id: existingId,
            name: 'TestAccount',
            initialBalance: 10,
          };
        }
        return undefined;
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: GlanceactionService, useValue: glanceactionService },
      ],
      imports: [
        HttpClientModule,
      ],
    });

    pipe = new AccountNamePipe(TestBed.get(GlanceactionService));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('.transform()', () => {
    it('should return the correct account name', () => {
      expect(pipe.transform(existingId)).toEqual('TestAccount');
    });

    it('should return \'Unknown account\' if the account does not exist', () => {
      expect(pipe.transform(42)).toEqual('Unknown account');
    });
  });
});
