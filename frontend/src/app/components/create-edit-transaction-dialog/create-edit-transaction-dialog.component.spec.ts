import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTransactionDialogComponent } from './create-edit-transaction-dialog.component';

describe('CreateEditTransactionDialogComponent', () => {
  let component: CreateEditTransactionDialogComponent;
  let fixture: ComponentFixture<CreateEditTransactionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditTransactionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
