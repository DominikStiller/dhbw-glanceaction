import { TestBed, async, inject } from '@angular/core/testing';

import { DataLoadedGuard } from './data-loaded.guard';

describe('DataLoadedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLoadedGuard]
    });
  });

  it('should ...', inject([DataLoadedGuard], (guard: DataLoadedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
