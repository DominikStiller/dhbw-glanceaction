import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';
import { NewTransaction, Transaction, UpdateTransaction } from '../models/transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(private http: HttpClient) {
  }

  /**
   * ACCOUNTS
   */
  getAccounts() {
    return this.http.get<Account[]>(BackendService.url('accounts'));
  }

  createAccount(account: NewAccount) {
    return this.http.post<Account>(BackendService.url('accounts'), account, httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateAccount(accountId: number, updatedAccount: UpdateAccount) {
    return this.http.put<Account>(
      BackendService.url(`accounts/${accountId}`),
      updatedAccount,
      httpOptions,
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
    return this.http.post<Transaction>(BackendService.url('transactions'), transaction, httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateTransaction(transactionId: number, updatedTransaction: UpdateTransaction) {
    return this.http.put<Transaction>(
      BackendService.url(`transactions/${transactionId}`),
      updatedTransaction,
      httpOptions,
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

  createCategory(category: Category) {
    return this.http.post<Category>(BackendService.url('categories'), category, httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateCategory(categoryName: string, updatedCategory: UpdateCategory) {
    return this.http.put<Category>(
      BackendService.url(`categories/${categoryName}`),
      updatedCategory,
      httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteCategory(categoryName: string) {
    return this.http.delete(BackendService.url(`categories/${categoryName}`))
      .pipe(catchError(BackendService.handleError));
  }

  private static url(path: string) {
    return `${environment.apiBase}/${path}`;
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
