export class Recurrence {
  type: RecurrenceType;
  interval: number;
  amount: number;

  static fromTransaction(recurrenceString: string) {
    const recurrence = new Recurrence();

    const recurrenceSplit = recurrenceString.split(' ');

    recurrence.amount = Number(recurrenceSplit[1]);
    if (recurrenceSplit[0] === 'm') {
      recurrence.type = RecurrenceType.Monthly;
      recurrence.interval = 30;
    } else {
      recurrence.interval = Number(recurrenceSplit[0]);
      if (recurrence.interval === 0) {
        recurrence.type = RecurrenceType.None;
      } else if (recurrence.interval === 7) {
        recurrence.type = RecurrenceType.Weekly;
      } else {
        recurrence.type = RecurrenceType.Custom;
      }
    }

    return recurrence;
  }

  toString(): string {
    let interval = this.interval.toString();
    if (this.type === RecurrenceType.Monthly) {
      interval = 'm';
    } else if (this.type === RecurrenceType.Weekly) {
      interval = '7';
    } else if (this.type === RecurrenceType.None) {
      interval = '0';
    }
    return `${interval} ${this.amount}`;
  }
}

export enum RecurrenceType {
  None = 'n',
  Weekly = 'w',
  Monthly = 'm',
  Custom = 'c',
}
