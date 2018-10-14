import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GlanceactionService } from './glanceaction.service';

describe('GlanceactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: GlanceactionService = TestBed.get(GlanceactionService);
    expect(service).toBeTruthy();
  });
});
