import { Pipe, PipeTransform } from '@angular/core';

import { Transaction } from '../models/transaction';
import { GlanceactionService } from '../services/glanceaction.service';

/** Pipe filtering a list of transactions */
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  constructor(private g: GlanceactionService) {
  }

  /**
   * Searches a list of transactions for a search term contained in its category name or notes
   * @param transactions - The list of transactions to filter
   * @param searchTerm - The search term to look for
   * @return The filtered list of transactions
   */
  transform(transactions: Transaction[], searchTerm: string): Transaction[] {
    if (!searchTerm) {
      return transactions;
    }

    const s = searchTerm.toLowerCase();
    return transactions.filter((t) => {
      // Check if transaction category name or notes contains search term
      return (t.category !== 0 && this.g.getCategory(t.category).name.toLowerCase().includes(s))
        || (t.notes && t.notes.toLowerCase().includes(s));
    });
  }
}
