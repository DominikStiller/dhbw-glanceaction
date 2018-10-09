import { TestBed } from '@angular/core/testing';

import { GlanceactionService } from './glanceaction.service';

describe('GlanceactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlanceactionService = TestBed.get(GlanceactionService);
    expect(service).toBeTruthy();
  });
});
