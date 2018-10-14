/** Interface representing an existing category */
export interface Category {
  /** The category's id */
  id: number;

  /** The category's name */
  name: string;

  /** The category's color */
  color: string;
}

/** Interface representing a category which has not yet been created **/
export class NewCategory {
  /** The category's name */
  name: string;

  /** The category's color */
  color: string;
}

/** Interface representing changes to a category **/
export class UpdateCategory {
  /** The category's name */
  name: string;

  /** The category's color */
  color: string;
}
