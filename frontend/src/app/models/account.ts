/** Interface representing an existing account */
export interface Account {
  /** The account's id */
  id: number;

  /** The account's name */
  name: string;

  /** The initial account balance in Euro */
  initialBalance: number;
}

/** Interface representing an account which has not yet been created **/
export interface NewAccount {
  /** The account's name */
  name: string;

  /** The initial account balance in Euro */
  initialBalance: number;
}

/** Interface representing changes to an account **/
export interface UpdateAccount {
  /** The account's name */
  name: string;

  /** The initial account balance in Euro */
  initialBalance: number;
}
