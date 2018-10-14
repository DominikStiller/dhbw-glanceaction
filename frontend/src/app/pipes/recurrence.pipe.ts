import { Pipe, PipeTransform } from '@angular/core';

import { Transaction } from '../models/transaction';
import { Recurrence, RecurrenceType } from '../models/recurrence';

/** Pipe implementing the recurrence functionality */
@Pipe({
  name: 'recurrence',
})
export class RecurrencePipe implements PipeTransform {

  /**
   * Apply recurrence on transactions
   *
   * @param transactions - An array of transactions to process
   * @return An array of transactions generated according to the recurrence specifiers, containing the original transaction and <code>amount</code> copies with adjusted dates
   */
  transform(transactions: Transaction[]): Transaction[] {
    const recurrences: Transaction[] = [];
    transactions.forEach((t) => {
      const recurrence = Recurrence.fromTransaction(t.recurrence);
      if (recurrence.type === RecurrenceType.None) {
        // Skip further processing if transaction does not recur
        return;
      }
      for (let i = 1; i <= recurrence.amount; i += 1) {
        // Recurred transactions are identical to the original apart from an updated timestamp
        const clone: Transaction = Object.assign({}, t);

        // Calculate timestamp according to recurrence specifier
        let timestamp: Date;
        if (recurrence.type === RecurrenceType.Monthly) {
          timestamp = new Date(clone.timestamp);
          timestamp.setMonth(timestamp.getMonth() + i);
        } else {
          timestamp = new Date(clone.timestamp);
          timestamp.setDate(new Date(clone.timestamp).getDate() + i * recurrence.interval);
        }
        clone.timestamp = timestamp.toISOString();
        recurrences.push(clone);
      }
    });
    return transactions.concat(recurrences);
  }
}
