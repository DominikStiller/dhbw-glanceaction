import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditTransactionDialogComponent } from './components/create-edit-transaction-dialog/create-edit-transaction-dialog.component';
import { AccountNamePipe } from './pipes/account-name.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    CreateEditTransactionDialogComponent,
    AccountNamePipe,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateEditTransactionDialogComponent,
  ],
})
export class AppModule {
}
