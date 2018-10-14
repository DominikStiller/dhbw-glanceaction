import { Pipe, PipeTransform } from '@angular/core';

import { GlanceactionService } from '../services/glanceaction.service';
import { Transaction } from '../models/transaction';

/** Pipe calculating the total balance */
@Pipe({
  name: 'totalAccountBalance',
})
export class TotalAccountBalancePipe implements PipeTransform {

  constructor(public g: GlanceactionService) {
  }

  /**
   * Calculate the total balance including all accounts' initial balances and a list of transactions
   * @param transactions - The transactions to include in the balance calculation
   * @return The total account balance
   */
  transform(transactions: Transaction[]): number {
    if (this.g.accounts === undefined) {
      return 0;
    }
    let totalAccountBalance = this.g.accounts
      .map(a => a.initialBalance)
      .reduce(this.sum, 0);
    totalAccountBalance += transactions
      .map(t => t.amount)
      .reduce(this.sum, 0);
    return totalAccountBalance;
  }

  private sum = (a, b) => a + b;
}
