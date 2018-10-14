import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Subject } from 'rxjs';

import { DataLoadedGuard } from './data-loaded.guard';
import { GlanceactionService } from '../services/glanceaction.service';

describe('DataLoadedGuard', () => {
  let guard: DataLoadedGuard;
  let glanceactionService;

  beforeEach(() => {
    glanceactionService = {
      dataLoaded: false,
      dataLoaded$: new Subject(),
    };

    TestBed.configureTestingModule({
      providers: [
        DataLoadedGuard,
        { provide: GlanceactionService, useValue: glanceactionService },
      ],
      imports: [HttpClientModule],
    });

    guard = TestBed.get(DataLoadedGuard);
  });

  it('should create', inject([DataLoadedGuard], (guard: DataLoadedGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('.canActivate()', () => {
    it('should return true if data has already been loaded', (done: DoneFn) => {
      glanceactionService.dataLoaded = true;
      guard.canActivate().subscribe((value) => {
        expect(value).toBeTruthy();
        done();
      });
      glanceactionService.dataLoaded$.next();
    });

    it('should return true if data has just loaded', (done: DoneFn) => {
      guard.canActivate().subscribe((value) => {
        expect(value).toBeTruthy();
        done();
      });
      glanceactionService.dataLoaded$.next();
    });
  });
});
