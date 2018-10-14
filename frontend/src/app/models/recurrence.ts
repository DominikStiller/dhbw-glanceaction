/**
 * Class representing a recurrence specifier for a transaction
 *
 * Has methods for handling the conversion between the representations of occurence in frontend and backend.
 */
export class Recurrence {
  /** The recurrence's type */
  type: RecurrenceType;

  /** The interval at which the recurrence should occur */
  interval: number;

  /** How often the transaction should recur */
  amount: number;

  /**
   * Create a Recurrence from a recurrence specifier in string form, as provided by the backend
   * @param recurrenceString - A recurrence specifier in string form
   * @return A Recurrence object
   * @see {@link Transaction} for the format of the string
   */
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

  /**
   * Convert a Recurrence into string form, as accepted by the backend
   * @return A recurrence specifier in string form
   * @see {@link Transaction} for the format of the string
   */
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

/** Enum representing recurrence types for transactions */
export enum RecurrenceType {
  /** Transaction does not recur */
  None = 'n',

  /** Transaction recurs weekly */
  Weekly = 'w',

  /** Transaction recurs monthly */
  Monthly = 'm',

  /** Transaction recurs at a custom interval specified in an {@link Recurrence} object */
  Custom = 'c',
}
