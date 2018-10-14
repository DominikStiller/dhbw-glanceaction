import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CreateEditTransactionComponent } from './create-edit-transaction.component';

describe('CreateEditTransactionComponent', () => {
  let component: CreateEditTransactionComponent;
  let fixture: ComponentFixture<CreateEditTransactionComponent>;

  beforeEach(async(() => {
    const datePipe = jasmine.createSpyObj('DatePipe', ['transform']);

    TestBed.configureTestingModule({
      declarations: [CreateEditTransactionComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, NgbModule, RouterTestingModule],
      providers: [
        { provide: DatePipe, useValue: datePipe },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
