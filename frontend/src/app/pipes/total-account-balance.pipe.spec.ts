import { TotalAccountBalancePipe } from './total-account-balance.pipe';
import { GlanceactionService } from '../services/glanceaction.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('TotalAccountBalancePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlanceactionService,
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  it('create an instance', () => {
    const pipe = new TotalAccountBalancePipe(TestBed.get(GlanceactionService));
    expect(pipe).toBeTruthy();
  });
});
