import { async, inject, TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { Category, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';

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
      const newAccountExpected = jasmine.objectContaining({
        name: 'newaccount',
        balance: 500.39,
      });
      const updateAccount: UpdateAccount = {
        name: 'updatedname',
        initialBalance: 400,
      };
      const updateAccountExpected = jasmine.objectContaining({
        name: 'updatedname',
        balance: 400,
      });
      // Do a full CRUD test with interspersed READ checks
      backend.getAccounts().subscribe((accounts) => {
        // Check that newAccount does not exist
        expect(accounts).not.toContain(newAccountExpected);
        // CREATE
        backend.createAccount(newAccount).subscribe((createdAccount: Account) => {
          expect(createdAccount).toEqual(newAccountExpected);
          // READ
          backend.getAccounts().subscribe((accounts) => {
            expect(accounts).toContain(newAccountExpected);
            // UPDATE
            backend.updateAccount(createdAccount, updateAccount)
              .subscribe((updatedAccount: Account) => {
                expect(updatedAccount).toEqual(updateAccountExpected);
                backend.getAccounts().subscribe((accounts) => {
                  expect(accounts).toContain(updateAccountExpected);
                  expect(accounts).not.toContain(newAccountExpected);
                  // DELETE
                  backend.deleteAccount(updatedAccount).subscribe(() => {
                    backend.getAccounts().subscribe((accounts) => {
                      expect(accounts).not.toContain(updateAccountExpected);
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

  it('should create, read, update and delete a transaction', async(
    inject([BackendService], (backend: BackendService) => {
      const newTransaction: NewTransaction = {
        amount: 25,
        account: 3,
        category: 'Food',
        timestamp: new Date(),
      };
      const updateTransaction: UpdateTransaction = {
        category: 'Vacation',
        notes: 'Test Notes',
      };
      const newAndUpdateTransaction: UpdateTransaction = {
        ...newTransaction,
        ...updateTransaction,
      };
      // Do a full CRUD test with interspersed READ checks
      backend.getTransactions().subscribe((transactions) => {
        // Check that newTransaction does not exist
        expect(transactions).not.toContain(jasmine.objectContaining(newTransaction));
        // CREATE
        backend.createTransaction(newTransaction).subscribe((createdTransaction: Transaction) => {
          expect(createdTransaction).toEqual(jasmine.objectContaining(newTransaction));
          // READ
          backend.getTransactions().subscribe((transactions) => {
            expect(transactions).toContain(jasmine.objectContaining(newTransaction));
            // UPDATE
            backend.updateTransaction(createdTransaction, updateTransaction)
              .subscribe((updatedTransaction: Transaction) => {
                expect(updatedTransaction).toEqual(
                  jasmine.objectContaining(newAndUpdateTransaction));
                backend.getTransactions().subscribe((transactions) => {
                  expect(transactions).toContain(jasmine.objectContaining(newAndUpdateTransaction));
                  expect(transactions).not.toContain(
                    jasmine.objectContaining(newAndUpdateTransaction));
                  // DELETE
                  backend.deleteTransaction(updatedTransaction).subscribe(() => {
                    backend.getTransactions().subscribe((transactions) => {
                      expect(transactions)
                        .not.toContain(jasmine.objectContaining(newAndUpdateTransaction));
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

  it('should create, read, update and delete a category', async(
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
                  // @ts-ignore
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
