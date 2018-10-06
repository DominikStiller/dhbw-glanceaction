import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category, UpdateCategory } from '../models/category';
import { Account, NewAccount, UpdateAccount } from '../models/account';

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
    return this.http.get<Account>(BackendService.url('accounts'));
  }

  createAccount(account: NewAccount) {
    return this.http.post<Account>(BackendService.url('accounts'), account, httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateAccount(oldAccount: Account | number, changedAccount: UpdateAccount) {
    const id = typeof oldAccount === 'number' ? oldAccount : oldAccount.id;
    return this.http.put<Account>(
      BackendService.url(`accounts/${id}`),
      changedAccount,
      httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteAccount(account: Account | number) {
    const id = typeof account === 'number' ? account : account.id;
    return this.http.delete(BackendService.url(`accounts/${id}`))
      .pipe(catchError(BackendService.handleError));
  }

  /**
   * CATEGORIES
   */
  getCategories() {
    return this.http.get<Category>(BackendService.url('categories'));
  }

  createCategory(category: Category) {
    return this.http.post<Category>(BackendService.url('categories'), category, httpOptions)
      .pipe(catchError(BackendService.handleError));
  }

  updateCategory(oldCategory: Category | string, changedCategory: UpdateCategory) {
    const name = typeof oldCategory === 'string' ? oldCategory : oldCategory.name;
    return this.http.put<Category>(
      BackendService.url(`categories/${name}`),
      changedCategory,
      httpOptions,
    ).pipe(catchError(BackendService.handleError));
  }

  deleteCategory(category: Category | string) {
    const name = typeof category === 'string' ? category : category.name;
    return this.http.delete(BackendService.url(`categories/${name}`))
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
