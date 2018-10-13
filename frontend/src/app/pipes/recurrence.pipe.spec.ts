import { RecurrencePipe } from './recurrence.pipe';
import { GlanceactionService } from '../services/glanceaction.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RecurrencePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlanceactionService,
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  it('create an instance', () => {
    const pipe = new RecurrencePipe(TestBed.get(GlanceactionService));
    expect(pipe).toBeTruthy();
  });
});
