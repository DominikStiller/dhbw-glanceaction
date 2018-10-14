import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';

import { Transaction } from '../models/transaction';
import { GlanceactionService } from './glanceaction.service';

/** Resolve for fetching a transaction for the {@link CreateEditTransactionComponent} */
@Injectable({
  providedIn: 'root',
})
export class TransactionResolverService implements Resolve<Transaction> {

  constructor(private g: GlanceactionService,
              private router: Router) {
  }

  /**
   * Find a transaction based on the URL id parameter
   *
   * Navigate to the transaction list if the transaction does not exist
   * @param route - The current route
   * @return The transaction
   */
  resolve(route: ActivatedRouteSnapshot): Observable<Transaction> | Observable<never> {
    const transaction = this.g.getTransaction(Number(route.paramMap.get('id')));
    if (!transaction) {
      this.router.navigate(['/']);
      return EMPTY;
    }
    return of(transaction);
  }
}
