import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';
import { Category, NewCategory, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { BackendService } from './backend.service';

/**
 * Service providing high-level methods for working with the GlanceAction REST API
 *
 * Serves as abstraction of {@link BackendService}, providing caching and more developer-friendly methods.
 * All actions are executed on the local cache and on the backend.
 */
@Injectable({
  providedIn: 'root',
})
export class GlanceactionService {

  /** Cache for accounts */
  accounts: Account[] = [];

  /** Cache for transactions */
  transactions: Transaction[] = [];

  /** Cache for categories */
  categories: Category[] = [];

  /** Whether the data have finished loading */
  dataLoaded = false;

  /** Emits when the data have finished loading */
  dataLoaded$ = new Subject();

  /**
   * Create a new GlanceactionService and load data asynchronously
   * @param backend - service to use for loading data
   */
  constructor(private backend: BackendService) {
    forkJoin(
      backend.getAccounts(),
      backend.getTransactions(),
      backend.getCategories(),
    ).subscribe((res) => {
      this.accounts = res[0];
      this.transactions = res[1];
      this.categories = res[2];

      this.dataLoaded = true;
      this.dataLoaded$.next();
    });
  }

  /** ACCOUNTS */
  /**
   * Get a specific account by id
   * @param id - The id of the account
   * @return The matching account or undefined
   */
  getAccount(id: number) {
    return this.accounts.find(a => a.id === id);
  }

  /**
   * Create a new account
   * @param account - The data for the new account
   * @return The account created by the backend
   */
  createAccount(account: NewAccount) {
    return this.backend.createAccount(account)
      .pipe(tap(a => this.accounts.push(a)));
  }

  /**
   * Update an existing account
   * @param oldAccount - The account to update
   * @param updatedAccount - The new data for the account update
   * @return The updated account returned from the backend
   */
  updateAccount(oldAccount: Account | number, updatedAccount: UpdateAccount) {
    const id = typeof oldAccount === 'number' ? oldAccount : oldAccount.id;
    return this.backend.updateAccount(id, updatedAccount)
      .pipe(tap((responseAccount) => {
        this.accounts = this.accounts.map(a => a.id === id ? Object.assign(a, responseAccount) : a);
      }));
  }

  /**
   * Delete an existing account
   * @param account - The account to delete
   */
  deleteAccount(account: Account | number) {
    const id = typeof account === 'number' ? account : account.id;
    return this.backend.deleteAccount(id)
      .pipe(tap(() => {
        this.accounts = this.accounts.filter(a => a.id !== id);
      }));
  }

  /** TRANSACTIONS */
  /**
   * Get a specific transaction by id
   * @param id - The id of the transaction
   * @return The matching transaction or undefined
   */
  getTransaction(id: number) {
    return this.transactions.find(t => t.id === id);
  }

  /**
   * Create a new transaction
   * @param transaction - The data for the new transaction
   * @return The transaction created by the backend
   */
  createTransaction(transaction: NewTransaction) {
    return this.backend.createTransaction(transaction)
      .pipe(tap((t) => {
        this.transactions.push(t);
      }));
  }

  /**
   * Update an existing transaction
   * @param oldTransaction - The transaction to update
   * @param updatedTransaction - The new data for the transaction update
   * @return The updated transaction returned from the backend
   */
  updateTransaction(oldTransaction: Transaction | number, updatedTransaction: UpdateTransaction) {
    const id = typeof oldTransaction === 'number' ? oldTransaction : oldTransaction.id;
    return this.backend.updateTransaction(id, updatedTransaction)
      .pipe(tap((responseTransaction) => {
        this.transactions = this.transactions.map(t => t.id === id ? Object.assign(t, responseTransaction) : t);
      }));
  }

  /**
   * Delete an existing account
   * @param transaction - The transaction to delete
   */
  deleteTransaction(transaction: Transaction | number) {
    const id = typeof transaction === 'number' ? transaction : transaction.id;

    return this.backend.deleteTransaction(id)
      .pipe(tap(() => {
        this.transactions = this.transactions.filter(t => t.id !== id);
      }));
  }

  /** CATEGORIES */
  /**
   * Get a specific category by id
   * @param id - The id of the category
   * @return The matching category or undefined
   */
  getCategory(id: number) {
    return this.categories.find(c => c.id === id);
  }

  /**
   * Create a new category
   * @param category - The data for the new category
   * @return The category created by the backend
   */
  createCategory(category: NewCategory) {
    return this.backend.createCategory(category)
      .pipe(tap((c => this.categories.push(c))));
  }

  /**
   * Update an existing category
   * @param oldCategory - The category to update
   * @param updatedCategory - The new data for the category update
   * @return The updated category returned from the backend
   */
  updateCategory(oldCategory: Category | number, updatedCategory: UpdateCategory) {
    const id = typeof oldCategory === 'number' ? oldCategory : oldCategory.id;
    return this.backend.updateCategory(id, updatedCategory)
      .pipe(tap((responseCategory) => {
        // Patch local version
        this.categories = this.categories.map(c => c.id === id ? Object.assign(c, responseCategory) : c);
      }));
  }

  /**
   * Delete an existing category
   * @param category - The category to delete
   */
  deleteCategory(category: Category | number) {
    const id = typeof category === 'number' ? category : category.id;
    return this.backend.deleteCategory(id)
      .pipe(tap(() => this.categories = this.categories.filter(c => c.id !== id)));
  }
}
