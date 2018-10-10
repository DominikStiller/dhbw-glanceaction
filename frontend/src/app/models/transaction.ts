export class Transaction {
  id: number;
  /**
   * Amount in Euro
   */
  amount: number;
  /**
   * Name of the category to assign
   */
  category?: string;
  account: number;
  /**
   * Instant at which the transaction happened
   */
  timestamp: string;
  notes?: string;
  /**
   * Format: 'i n'
   * i: Interval of recurrence in days
   * n: Amount of recurrences
   * '0 0' to disable
   */
  // TODO set type to string
  recurrence?: number;
}

export interface NewTransaction {
  amount: number;
  category?: string;
  account: number;
  timestamp: string;
  notes?: string;
  recurrence?: number;
}

export interface UpdateTransaction {
  amount?: number;
  category?: string;
  account?: number;
  timestamp?: string;
  notes?: string;
  recurrence?: number;
}
