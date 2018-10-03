import { async, inject, TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';

describe('BackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
  }));

  it('should be created', () => {
    const service: BackendService = TestBed.get(BackendService);
    expect(service).toBeTruthy();
  });

  it('should issue a request', async(
      inject([BackendService], (backend: BackendService) => {
        backend.getCategories().subscribe(d => console.log(d));
      }),
    ),
  );
});
