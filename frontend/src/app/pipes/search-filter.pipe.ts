import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  transform(transactions: Transaction[], searchTerm: string): Transaction[] {
    if (!searchTerm) {
      return transactions;
    }

    const s = searchTerm.toLowerCase();
    return transactions.filter((t) => {
      return t.category.toLowerCase().includes(s) || t.notes.toLowerCase().includes(s);
    });
  }
}
