import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';
import { Category, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlanceactionService {

  accounts: Account[];
  transactions: Transaction[] = [];
  categories: Category[];
  totalAccountBalance: number = 0;

  constructor(private backend: BackendService) {
    forkJoin(
      backend.getAccounts(),
      backend.getTransactions(),
    ).subscribe((res) => {
      this.accounts = res[0];
      this.transactions = res[1];
      this.calculateTotalAccountBalance();
      console.log(this.totalAccountBalance);
    });
    backend.getCategories().subscribe(d => this.categories = d);
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

  private calculateTotalAccountBalance() {
    this.totalAccountBalance = this.accounts.map(a => a.initialBalance).reduce((a, b) => a + b, 0);
    this.totalAccountBalance += this.transactions
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
        this.accounts = this.accounts.map(a => a.id === id ? Object.assign(a, updatedAccount) : a);
        this.calculateTotalAccountBalance();
      }));
  }

  deleteAccount(account: Account | number) {
    const id = typeof account === 'number' ? account : account.id;
    return this.backend.deleteAccount(id)
      .pipe(tap(() => this.calculateTotalAccountBalance()));
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
        this.calculateTotalAccountBalance();
      }));
  }

  updateTransaction(oldTransaction: Transaction | number, updatedTransaction: UpdateTransaction) {
    const id = typeof oldTransaction === 'number' ? oldTransaction : oldTransaction.id;
    return this.backend.updateTransaction(id, updatedTransaction)
      .pipe(tap((responseTransaction) => {
        this.transactions = this.transactions.map(t => t.id === id ? Object.assign(t, updatedTransaction) : t);
        this.calculateTotalAccountBalance();
      }));
  }

  deleteTransaction(transaction: Transaction | number) {
    const id = typeof transaction === 'number' ? transaction : transaction.id;

    return this.backend.deleteTransaction(id)
      .pipe(tap(() => {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.calculateTotalAccountBalance();
      }));
  }

  /**
   * CATEGORIES
   */
  getCategory(name: string) {
    return this.categories.find(c => c.name === name);
  }

  createCategory(category: Category) {
    return this.backend.createCategory(category)
      .pipe(tap((c => this.categories.push(c))));
  }

  updateCategory(oldCategory: Category | string, updatedCategory: UpdateCategory) {
    const name = typeof oldCategory === 'string' ? oldCategory : oldCategory.name;
    return this.backend.updateCategory(name, updatedCategory)
      .pipe(tap((responseCategory) => {
        // Patch local version
        this.categories = this.categories.map(c => c.name === name ? Object.assign(c, updatedCategory) : c);
      }));
  }

  deleteCategory(category: Category | string) {
    const name = typeof category === 'string' ? category : category.name;
    return this.backend.deleteCategory(name)
      .pipe(tap(() => this.categories = this.categories.filter(c => c.name !== name)));
  }
}
