import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe returning an empty array
 *
 * Purpose: to be used with {@link TotalAccountBalancePipe} to calculate just the accounts' balances without transactions
 */
@Pipe({
  name: 'empty',
})
export class EmptyPipe implements PipeTransform {

  /**
   * Return an empty array
   * @param value - Any array
   * @return An empty array
   */
  transform(value: any[]): any[] {
    return [];
  }
}
