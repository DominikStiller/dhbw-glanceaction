import { Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../services/glanceaction.service';

@Pipe({
  name: 'categoryName',
})
export class CategoryNamePipe implements PipeTransform {

  constructor(public g: GlanceactionService) {
  }

  transform(categoryId: number): string {
    const category = this.g.getCategory(categoryId);
    if (category !== undefined) {
      return category.name;
    }
    return 'Unknown category';
  }

}
