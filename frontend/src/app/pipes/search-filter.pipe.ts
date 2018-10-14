import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';
import { GlanceactionService } from '../services/glanceaction.service';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  constructor(private g: GlanceactionService) {
  }

  transform(transactions: Transaction[], searchTerm: string): Transaction[] {
    if (!searchTerm) {
      return transactions;
    }

    const s = searchTerm.toLowerCase();
    return transactions.filter((t) => {
      return (t.category !== 0 && this.g.getCategory(t.category).name.toLowerCase().includes(s))
        || (t.notes && t.notes.toLowerCase().includes(s));
    });
  }
}
