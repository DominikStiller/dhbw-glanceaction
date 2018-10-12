import { TestBed } from '@angular/core/testing';

import { TransactionResolverService } from './transaction-resolver.service';

describe('TransactionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionResolverService = TestBed.get(TransactionResolverService);
    expect(service).toBeTruthy();
  });
});
