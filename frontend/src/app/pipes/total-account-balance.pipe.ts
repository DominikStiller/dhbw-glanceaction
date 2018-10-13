import { Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../services/glanceaction.service';
import { Transaction } from '../models/transaction';

@Pipe({
  name: 'totalAccountBalance',
})
export class TotalAccountBalancePipe implements PipeTransform {

  constructor(public g: GlanceactionService) {
  }

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
    console.log(totalAccountBalance);
    return totalAccountBalance;
  }

  private sum = (a, b) => a + b;
}
