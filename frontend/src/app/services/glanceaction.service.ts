import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';
import { Category, CreateCategory, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { tap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlanceactionService {

  accounts: Account[] = [];
  transactions: Transaction[] = [];
  categories: Category[] = [];

  dataLoaded = false;
  dataLoaded$ = new Subject();

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
      this.dataLoaded$.next(true);
    });
  }

  /**
   * ACCOUNTS
   */
  getAccount(id: number) {
    return this.accounts.find(a => a.id === id);
  }

  getAccountBalance(id: number) {
    return this.transactions
      .filter(a => a.id === id)
      .map(t => t.amount)
      .reduce((a, b) => a + b, 0);
  }

  createAccount(account: NewAccount) {
    return this.backend.createAccount(account)
      .pipe(tap(a => this.accounts.push(a)));
  }

  updateAccount(oldAccount: Account | number, updatedAccount: UpdateAccount) {
    const id = typeof oldAccount === 'number' ? oldAccount : oldAccount.id;
    return this.backend.updateAccount(id, updatedAccount)
      .pipe(tap((responseAccount) => {
        this.accounts = this.accounts.map(a => a.id === id ? Object.assign(a, responseAccount) : a);
      }));
  }

  deleteAccount(account: Account | number) {
    const id = typeof account === 'number' ? account : account.id;
    return this.backend.deleteAccount(id)
      .pipe(tap(() => {
        this.accounts = this.accounts.filter(a => a.id !== id);
      }));
  }

  /**
   * TRANSACTIONS
   */
  getTransaction(id: number) {
    return this.transactions.find(t => t.id === id);
  }

  createTransaction(transaction: NewTransaction) {
    return this.backend.createTransaction(transaction)
      .pipe(tap((t) => {
        this.transactions.push(t);
      }));
  }

  updateTransaction(oldTransaction: Transaction | number, updatedTransaction: UpdateTransaction) {
    const id = typeof oldTransaction === 'number' ? oldTransaction : oldTransaction.id;
    return this.backend.updateTransaction(id, updatedTransaction)
      .pipe(tap((responseTransaction) => {
        this.transactions = this.transactions.map(t => t.id === id ? Object.assign(t, responseTransaction) : t);
      }));
  }

  deleteTransaction(transaction: Transaction | number) {
    const id = typeof transaction === 'number' ? transaction : transaction.id;

    return this.backend.deleteTransaction(id)
      .pipe(tap(() => {
        this.transactions = this.transactions.filter(t => t.id !== id);
      }));
  }

  /**
   * CATEGORIES
   */
  getCategory(id: number) {
    return this.categories.find(c => c.id === id);
  }

  createCategory(category: CreateCategory) {
    return this.backend.createCategory(category)
      .pipe(tap((c => this.categories.push(c))));
  }

  updateCategory(oldCategory: Category | number, updatedCategory: UpdateCategory) {
    const id = typeof oldCategory === 'number' ? oldCategory : oldCategory.id;
    return this.backend.updateCategory(id, updatedCategory)
      .pipe(tap((responseCategory) => {
        // Patch local version
        this.categories = this.categories.map(c => c.id === id ? Object.assign(c, responseCategory) : c);
      }));
  }

  deleteCategory(category: Category | number) {
    const id = typeof category === 'number' ? category : category.id;
    return this.backend.deleteCategory(id)
      .pipe(tap(() => this.categories = this.categories.filter(c => c.id !== id)));
  }
}
