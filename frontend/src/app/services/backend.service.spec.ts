import { async, inject, TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { Category, NewCategory, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';

// CONFIG
// Existing account id necesary to create transaction
const existingAccountId = 21;

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
      // Use objectContaining because an id field is added
      const newAccountExpected = jasmine.objectContaining(newAccount);
      const updateAccount: UpdateAccount = {
        name: 'updatedname',
        initialBalance: 400,
      };
      const updateAccountExpected = jasmine.objectContaining(updateAccount);
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
            backend.updateAccount(createdAccount.id, updateAccount)
              .subscribe((updatedAccount: Account) => {
                expect(updatedAccount).toEqual(updateAccountExpected);
                backend.getAccounts().subscribe((accounts) => {
                  expect(accounts).toContain(updateAccountExpected);
                  expect(accounts).not.toContain(newAccountExpected);
                  // DELETE
                  backend.deleteAccount(updatedAccount.id).subscribe(() => {
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
        account: existingAccountId,
        category: 0,
        timestamp: new Date().toISOString(),
        recurrence: 'm 5',
      };
      const newTransactionExpected = jasmine.objectContaining(newTransaction);
      const updateTransaction: UpdateTransaction = Object.assign({}, newTransaction, {
        amount: -17.35,
        notes: 'Test Notes',
      });
      const updateTransactionExpected = jasmine.objectContaining(updateTransaction);
      // Do a full CRUD test with interspersed READ checks
      backend.getTransactions().subscribe((transactions) => {
        // Check that newTransaction does not exist
        expect(transactions).not.toContain(newTransactionExpected);
        // CREATE
        backend.createTransaction(newTransaction).subscribe((createdTransaction: Transaction) => {
          expect(createdTransaction).toEqual(newTransactionExpected);
          // READ
          backend.getTransactions().subscribe((transactions) => {
            expect(transactions).toContain(newTransactionExpected);
            // UPDATE
            backend.updateTransaction(createdTransaction.id, updateTransaction)
              .subscribe((updatedTransaction: Transaction) => {
                expect(updatedTransaction).toEqual(updateTransactionExpected);
                backend.getTransactions().subscribe((transactions) => {
                  expect(transactions).toContain(updateTransactionExpected);
                  expect(transactions).not.toContain(newTransactionExpected);
                  // DELETE
                  backend.deleteTransaction(updatedTransaction.id).subscribe(() => {
                    backend.getTransactions().subscribe((transactions) => {
                      expect(transactions)
                        .not.toContain(updateTransactionExpected);
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
      const newCategory: NewCategory = {
        name: 'newcategory',
        color: '#aabbcc',
      };
      const newCategoryExpected = jasmine.objectContaining(newCategory);
      const updateCategory: UpdateCategory = {
        name: 'updatedname',
        color: '#112233',
      };
      const updateCategoryExpected = jasmine.objectContaining(updateCategory);
      // Do a full CRUD test with interspersed READ checks
      backend.getCategories().subscribe((categories) => {
        // Check that newCategory does not exist
        expect(categories).not.toContain(newCategoryExpected);
        // CREATE
        backend.createCategory(newCategory).subscribe((createdCategory: Category) => {
          expect(createdCategory).toEqual(newCategoryExpected);
          // READ
          backend.getCategories().subscribe((categories) => {
            expect(categories).toContain(newCategoryExpected);
            // UPDATE
            backend.updateCategory(createdCategory.id, updateCategory)
              .subscribe((updatedCategory: Category) => {
                // @ts-ignore
                expect(updatedCategory).toEqual(updateCategoryExpected);
                backend.getCategories().subscribe((categories) => {
                  // @ts-ignore
                  expect(categories).toContain(updateCategoryExpected);
                  expect(categories).not.toContain(newCategoryExpected);
                  // DELETE
                  backend.deleteCategory(updatedCategory.id).subscribe(() => {
                    backend.getCategories().subscribe((categories) => {
                      expect(categories).not.toContain(updateCategoryExpected);
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
