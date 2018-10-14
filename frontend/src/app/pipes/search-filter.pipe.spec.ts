import { SearchFilterPipe } from './search-filter.pipe';
import { GlanceactionService } from '../services/glanceaction.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SearchFilterPipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlanceactionService,
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  it('create an instance', () => {
    const pipe = new SearchFilterPipe(TestBed.get(GlanceactionService));
    expect(pipe).toBeTruthy();
  });
});
