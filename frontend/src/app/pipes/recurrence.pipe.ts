import { Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../services/glanceaction.service';
import { Transaction } from '../models/transaction';
import { Recurrence, RecurrenceType } from '../models/recurrence';

@Pipe({
  name: 'recurrence',
})
export class RecurrencePipe implements PipeTransform {

  constructor(public g: GlanceactionService) {
  }

  transform(transactions: Transaction[]): Transaction[] {
    const recurrences: Transaction[] = [];
    transactions.forEach((t) => {
        const recurrence = Recurrence.fromTransaction(t.recurrence);
        if (recurrence.type === RecurrenceType.None) {
          return;
        }
        for (let i = 1; i <= recurrence.amount; i += 1) {
          const clone: Transaction = Object.assign({}, t);
          let timestamp: Date;
          if (recurrence.type === RecurrenceType.Monthly) {
            timestamp = new Date(clone.timestamp);
            timestamp.setMonth(timestamp.getMonth() + i);
          } else {
            timestamp = new Date();
            timestamp.setDate(new Date(clone.timestamp).getDate() + i * recurrence.interval);
          }
          clone.timestamp = timestamp.toISOString();
          recurrences.push(clone);
        }
      },
    );
    return transactions.concat(recurrences);
  }
}
