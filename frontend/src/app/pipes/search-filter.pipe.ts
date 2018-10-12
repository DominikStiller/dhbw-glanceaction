import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  transform(transactions: Transaction[], term: string): Transaction[] {
    if (!term) {
      return transactions;
    }
    // TODO Implement search filter
  }
}
