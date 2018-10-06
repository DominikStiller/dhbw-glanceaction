import { async, inject, TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { Category, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';

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

  it('should create, read, update and delete an account', async(
    inject([BackendService], (backend: BackendService) => {
      const newAccount: NewAccount = {
        name: 'newaccount',
        initialBalance: 500.39,
      };
      const updateAccount: UpdateAccount = {
        name: 'updatedname',
        initialBalance: 400,
      };
      // Do a full CRUD test with interspersed READ checks
      backend.getAccounts().subscribe((accounts) => {
        // Check that newAccount does not exist
        expect(accounts).not.toContain(jasmine.objectContaining(newAccount));
        // CREATE
        backend.createAccount(newAccount).subscribe((createdAccount: Account) => {
          expect(createdAccount).toEqual(jasmine.objectContaining({
            name: 'newaccount',
            balance: 500.39,
          }));
          // READ
          backend.getAccounts().subscribe((accounts) => {
            expect(accounts).toContain(jasmine.objectContaining(newAccount));
            // UPDATE
            backend.updateAccount(createdAccount, updateAccount)
              .subscribe((updatedAccount: Account) => {
                expect(createdAccount).toEqual(jasmine.objectContaining({
                  name: 'updatedname',
                  balance: 400,
                }));
                backend.getAccounts().subscribe((accounts) => {
                  expect(accounts).toContain(jasmine.objectContaining(updateAccount));
                  expect(accounts).not.toContain(jasmine.objectContaining(newAccount));
                  // DELETE
                  backend.deleteAccount(updatedAccount).subscribe(() => {
                    backend.getAccounts().subscribe((accounts) => {
                      expect(accounts).not.toContain(jasmine.objectContaining(updateAccount));
                    });
                  });
                });
              });
          });
        });
      });
    }),
    ),
  );

  xit('should create, read, update and delete a category', async(
    inject([BackendService], (backend: BackendService) => {
      const newCategory: Category = {
        name: 'newcategory',
        color: '#aabbcc',
      };
      const updateCategory: UpdateCategory = {
        name: 'updatedname',
        color: '#112233',
      };
      // Do a full CRUD test with interspersed READ checks
      backend.getCategories().subscribe((categories) => {
        // Check that newCategory does not exist
        expect(categories).not.toContain(newCategory);
        // CREATE
        backend.createCategory(newCategory).subscribe((createdCategory: Category) => {
          expect(createdCategory).toEqual(newCategory);
          // READ
          backend.getCategories().subscribe((categories) => {
            expect(categories).toContain(newCategory);
            // UPDATE
            backend.updateCategory(createdCategory, updateCategory)
              .subscribe((updatedCategory: Category) => {
                // @ts-ignore
                expect(updatedCategory).toEqual(updateCategory);
                backend.getCategories().subscribe((categories) => {
                  expect(categories).toContain(updateCategory);
                  expect(categories).not.toContain(newCategory);
                  // DELETE
                  backend.deleteCategory(updatedCategory).subscribe(() => {
                    backend.getCategories().subscribe((categories) => {
                      expect(categories).not.toContain(updatedCategory);
                    });
                  });
                });
              });
          });
        });
      });
    }),
    ),
  );
});
