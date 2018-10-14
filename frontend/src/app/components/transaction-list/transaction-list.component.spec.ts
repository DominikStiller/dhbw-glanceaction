import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { TransactionListComponent } from './transaction-list.component';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { RecurrencePipe } from '../../pipes/recurrence.pipe';
import { TotalAccountBalancePipe } from '../../pipes/total-account-balance.pipe';
import { EmptyPipe } from '../../pipes/empty.pipe';
import { SortTransactionsPipe } from '../../pipes/sort-transactions.pipe';
import { AccountNamePipe } from '../../pipes/account-name.pipe';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionListComponent, SearchFilterPipe, RecurrencePipe, TotalAccountBalancePipe, EmptyPipe, SortTransactionsPipe, AccountNamePipe],
      imports: [HttpClientModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
