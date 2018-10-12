import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Transaction } from '../models/transaction';
import { GlanceactionService } from './glanceaction.service';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionResolverService implements Resolve<Transaction> {

  constructor(private g: GlanceactionService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction> | Observable<never> {
    const transaction = this.g.getTransaction(Number(route.paramMap.get('id')));
    if (!transaction) {
      this.router.navigate(['/']);
      return EMPTY;
    }
    return of(transaction);
  }
}
