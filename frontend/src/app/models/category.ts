export class Category {
  id: number;
  name: string;
  color?: string;
}

export class NewCategory {
  name: string;
  color?: string;
}

export class UpdateCategory {
  name?: string;
  color?: string;
}
