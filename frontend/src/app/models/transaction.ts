export class Transaction {
  id: number;
  /**
   * Amount in Euro
   */
  amount: number;
  /**
   * ID of the category to assign
   */
  category?: number;
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
  recurrence?: string;
}

export interface NewTransaction {
  amount: number;
  category?: number;
  account: number;
  timestamp: string;
  notes?: string;
  recurrence?: string;
}

export interface UpdateTransaction {
  amount?: number;
  category?: number;
  account?: number;
  timestamp?: string;
  notes?: string;
  recurrence?: string;
}
