export class Account {
  id: number;
  name: string;
  /**
   * Account balance in Euro
   */
  balance: number;
}

export interface NewAccount {
  name: string;
  /**
   * Initial account balance in Euro
   */
  initialBalance: number;
}

export interface UpdateAccount {
  name?: string;
  initialBalance?: number;
}
