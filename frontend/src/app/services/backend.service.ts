import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.url('categories'));
  }

  createCategory(category: Category) {
    return this.http.post<Category>(this.url('categories'), category, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private url(path: string) {
    return `${environment.apiBase}/${path}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
