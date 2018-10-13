import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category, CreateCategory, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
  }

  /**
   * ACCOUNTS
   */
  getAccounts() {
    return this.http.get<Account[]>(BackendService.url('accounts'));
  }

  createAccount(account: NewAccount) {
    return this.http.post<Account>(BackendService.url('accounts'), account, this.httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateAccount(accountId: number, updatedAccount: UpdateAccount) {
    return this.http.put<Account>(
      BackendService.url(`accounts/${accountId}`),
      updatedAccount,
      this.httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteAccount(accountId: number) {
    return this.http.delete(BackendService.url(`accounts/${accountId}`))
      .pipe(catchError(BackendService.handleError));
  }

  /**
   * TRANSACTIONS
   */
  getTransactions() {
    return this.http.get<Transaction[]>(BackendService.url('transactions'));
  }

  createTransaction(transaction: NewTransaction) {
    return this.http.post<Transaction>(BackendService.url('transactions'), transaction, this.httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateTransaction(transactionId: number, updatedTransaction: UpdateTransaction) {
    return this.http.put<Transaction>(
      BackendService.url(`transactions/${transactionId}`),
      updatedTransaction,
      this.httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteTransaction(transactionId: number) {
    return this.http.delete(BackendService.url(`transactions/${transactionId}`))
      .pipe(catchError(BackendService.handleError));
  }

  /**
   * CATEGORIES
   */
  getCategories() {
    return this.http.get<Category[]>(BackendService.url('categories'));
  }

  createCategory(category: CreateCategory) {
    return this.http.post<Category>(BackendService.url('categories'), category, this.httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateCategory(categoryId: number, updatedCategory: UpdateCategory) {
    return this.http.put<Category>(
      BackendService.url(`categories/${categoryId}`),
      updatedCategory,
      this.httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(BackendService.url(`categories/${categoryId}`))
      .pipe(catchError(BackendService.handleError));
  }

  private static url(path: string) {
    return `${environment.apiBase}/${path}`;
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(error.error.error.message);
  }
}
