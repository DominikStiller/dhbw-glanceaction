import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TransactionResolverService } from './transaction-resolver.service';
import { GlanceactionService } from './glanceaction.service';

describe('TransactionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GlanceactionService, useValue: {} },
      ],
      imports: [RouterTestingModule],
    });
  });

  it('should be created', () => {
    const service: TransactionResolverService = TestBed.get(TransactionResolverService);
    expect(service).toBeTruthy();
  });
});
