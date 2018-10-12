import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CreateEditTransactionComponent } from './components/create-edit-transaction/create-edit-transaction.component';
import { AccountNamePipe } from './pipes/account-name.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { RecurrencePipe } from './pipes/recurrence.pipe';
import { SortTransactionsPipe } from './pipes/sort-transactions.pipe';
import { TotalAccountBalancePipe } from './pipes/total-account-balance.pipe';
import { EmptyPipe } from './pipes/empty.pipe';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionResolverService } from './services/transaction-resolver.service';
import { DataLoadedGuard } from './guards/data-loaded.guard';

const appRoutes: Routes = [
  { path: 'settings', component: SettingsComponent },
  {
    path: 'create',
    component: CreateEditTransactionComponent,
    data: { t: null },
  },
  {
    path: 'edit/:id',
    component: CreateEditTransactionComponent,
    resolve: { t: TransactionResolverService },
    canActivate: [DataLoadedGuard],
  },
  { path: '', component: TransactionListComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    CreateEditTransactionComponent,
    AccountNamePipe,
    SearchFilterPipe,
    RecurrencePipe,
    SortTransactionsPipe,
    TotalAccountBalancePipe,
    EmptyPipe,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateEditTransactionComponent,
  ],
})
export class AppModule {
}
