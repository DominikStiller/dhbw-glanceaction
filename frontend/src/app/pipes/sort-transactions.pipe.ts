import { Pipe, PipeTransform } from '@angular/core';

import { Transaction } from '../models/transaction';

/** Pipe sorting a list of transactions by date */
@Pipe({
  name: 'sortTransactions',
})
export class SortTransactionsPipe implements PipeTransform {

  /**
   * Sort a list of transactions by date in ascending order
   * @param transactions - The list of transactions to sort
   * @return The sorted list
   */
  transform(transactions: Transaction[]): any {
    // Sort a copy of the array by using concat()
    return transactions.concat().sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      return 0;
    });
  }
}
