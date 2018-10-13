export class Category {
  id: number;
  name: string;
  color?: string;
}

export class CreateCategory {
  name: string;
  color?: string;
}

export class UpdateCategory {
  name?: string;
  color?: string;
}
