import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';

@Pipe({
  name: 'sortTransactions',
})
export class SortTransactionsPipe implements PipeTransform {

  transform(transactions: Transaction[]): any {
    return transactions.sort((a, b) => {
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
