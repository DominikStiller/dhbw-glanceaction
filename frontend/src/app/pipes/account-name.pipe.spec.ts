import { AccountNamePipe } from './account-name.pipe';
import { TestBed } from '@angular/core/testing';
import { GlanceactionService } from '../services/glanceaction.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccountNamePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlanceactionService,
    ],
    imports: [
      HttpClientModule,
    ],
  }));

  it('create an instance', () => {
    const pipe = new AccountNamePipe(TestBed.get(GlanceactionService));
    expect(pipe).toBeTruthy();
  });
});
