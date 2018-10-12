export class Account {
  id: number;
  name: string;
  /**
   * Initial account balance in Euro
   */
  initialBalance: number;
}

export interface NewAccount {
  name: string;
  initialBalance: number;
}

export interface UpdateAccount {
  name?: string;
  initialBalance?: number;
}
