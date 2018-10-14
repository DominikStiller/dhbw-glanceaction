/** Interface representing an existing transaction */
export interface Transaction {
  /** The transaction's id */
  id: number;

  /** The transaction's amount in Euro */
  amount: number;

  /** The id of the category this transaction is assigned to */
  category: number;

  /** The id of the account this transaction is assigned to */
  account: number;

  /** The instant at which the transaction happened */
  timestamp: string;

  /** Any notes regarding the transaction */
  notes: string;

  /**
   * The transaction's recurrence specification
   *
   * Format: 'i n'
   * i: Interval of recurrence in days or 'm' for monthly recurrence
   * n: Amount of recurrences additional to original transaction (e.g. n = 2 means the transaction happens 3 times)
   * '0 0' to disable
   */
  recurrence: string;
}

/** Interface representing a transaction which has not yet been created **/
export interface NewTransaction {
  /** The transaction's amount in Euro */
  amount: number;

  /** The id of the category this transaction is assigned to */
  category: number;

  /** The id of the account this transaction is assigned to */
  account: number;

  /** The instant at which the transaction happened */
  timestamp: string;

  /** Any notes regarding the transaction */
  notes: string;

  /**
   * The transaction's recurrence specification
   *
   * @see {@link Transaction} for format information
   */
  recurrence: string;
}

/** Interface representing changes to a transaction **/
export interface UpdateTransaction {
  /** The transaction's amount in Euro */
  amount: number;

  /** The id of the category this transaction is assigned to */
  category: number;

  /** The id of the account this transaction is assigned to */
  account: number;

  /** The instant at which the transaction happened */
  timestamp: string;

  /** Any notes regarding the transaction */
  notes: string;

  /**
   * The transaction's recurrence specification
   *
   * @see {@link Transaction} for format information
   */
  recurrence: string;
}
