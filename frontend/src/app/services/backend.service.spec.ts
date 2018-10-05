import { async, inject, TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { Category } from '../models/category';

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

  it('should get categories', async(
    inject([BackendService], (backend: BackendService) => {
      backend.getCategories().subscribe((data) => {
        expect(data).toContain({ name: 'Food', color: '#ffffff' });
      });
    }),
    ),
  );
  it('should create a category', async(
    inject([BackendService], (backend: BackendService) => {
      const c: Category = {
        name: 'newcategory',
        color: '#aabbcc',
      };
      backend.createCategory(c).subscribe((data) => {
        expect(data).toEqual(c);
      });
    }),
    ),
  );
});
