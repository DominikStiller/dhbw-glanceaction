import { Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../services/glanceaction.service';

@Pipe({
  name: 'accountName',
})
export class AccountNamePipe implements PipeTransform {

  constructor(public g: GlanceactionService) {
  }

  transform(accountId: number): string {
    const account = this.g.getAccount(accountId);
    if (account !== undefined) {
      return account.name;
    }
    return 'Unknown account';
  }
}
