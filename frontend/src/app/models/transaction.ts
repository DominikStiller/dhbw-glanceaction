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
   * Instant at which the transaction happened, Format ISO 8601
   */
  timestamp: Date;
  notes?: string;
  /**
   * Interval of recurrence in days, 0 to disable
   */
  recurrence?: number;
}

export interface NewTransaction {
  amount: number;
  category?: string;
  account: number;
  timestamp: Date;
  notes?: string;
  recurrence?: number;
}

export interface ChangeTransaction {
  amount?: number;
  category?: string;
  account?: number;
  timestamp?: Date;
  notes?: string;
  recurrence?: number;
}
