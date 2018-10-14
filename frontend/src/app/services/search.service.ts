import { Injectable } from '@angular/core';

/** Service that enables sharing of the search term between {@link AppComponent} and {@link TransactionListComponent} */
@Injectable({
  providedIn: 'root',
})
export class SearchService {

  /** The search term */
  term: string;

  constructor() {
    this.reset();
  }

  /** Reset the search term to an empty string */
  public reset() {
    this.term = '';
  }
}
