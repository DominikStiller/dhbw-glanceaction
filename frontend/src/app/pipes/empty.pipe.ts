import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
})
export class EmptyPipe implements PipeTransform {

  // Necessary for the beginning balance to work
  transform(value: any[]): any[] {
    return [];
  }
}
