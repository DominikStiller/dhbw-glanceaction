import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NewTransaction, Transaction } from '../../models/transaction';
import { GlanceactionService } from '../../services/glanceaction.service';
import { NgbActiveModal, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-edit-transaction-dialog',
  templateUrl: './create-edit-transaction-dialog.component.html',
  styleUrls: ['./create-edit-transaction-dialog.component.scss'],
})
export class CreateEditTransactionDialogComponent implements OnInit {

  RecurrenceType = RecurrenceType;

  @Input() t: Transaction;
  @ViewChild('domForm') domForm: ElementRef;
  private model: FormModel;
  creationMode: boolean;

  displayValidation: boolean = false;

  form: FormGroup;

  constructor(private g: GlanceactionService,
              public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private ngbCalendar: NgbCalendar,
              private ngbDateParser: NgbDateParserFormatter,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.creationMode = this.t === null;
    if (this.creationMode) {
      this.model = new FormModel(this.ngbCalendar, this.datePipe);
    } else {
      this.model = FormModel.fromTransaction(this.t, this.ngbDateParser, this.datePipe);
    }

    this.form = this.fb.group(this.model);
  }

  submit() {
    if (!this.domForm.nativeElement.checkValidity()) {
      this.displayValidation = true;
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const newTransaction = FormModel.toNewTransaction(Object.assign({}, this.form.value));
    if (this.creationMode) {
      this.g.createTransaction(newTransaction).subscribe(() => this.activeModal.close());
    } else {
      this.g.updateTransaction(this.t, newTransaction).subscribe(() => this.activeModal.close());
    }
  }

  delete() {
    this.g.deleteTransaction(this.t).subscribe(() => this.activeModal.close());
  }
}

class FormModel {
  amount: number = undefined;
  category: string = null;
  account: number = undefined;
  timestampDate: NgbDateStruct;
  timestampTime: string;
  notes: string = '';
  recurrenceType: RecurrenceType = RecurrenceType.None;
  recurrenceInterval: number = 0;
  recurrenceAmount: number = 10;

  constructor(ngbCalendar: NgbCalendar, datePipe: DatePipe) {
    // TODO select default account
    this.timestampDate = ngbCalendar.getToday();
    this.timestampTime = datePipe.transform(new Date(), 'HH:mm');
  }

  static fromTransaction(t: Transaction, dateParser: NgbDateParserFormatter, datePipe: DatePipe): FormModel {
    let recurrenceType = RecurrenceType.Custom;
    let recurrenceInterval = t.recurrence.charAt(0);
    if (recurrenceInterval === '0') {
      recurrenceType = RecurrenceType.None;
    }
    if (recurrenceInterval === '7') {
      recurrenceType = RecurrenceType.Weekly;
    }
    if (recurrenceInterval === 'm') {
      recurrenceType = RecurrenceType.Monthly;
      recurrenceInterval = 30;
    }
    return {
      amount: t.amount,
      category: t.category,
      account: t.account,
      timestampDate: dateParser.parse(t.timestamp),
      timestampTime: datePipe.transform(new Date(t.timestamp), 'HH:mm'),
      notes: t.notes,
      recurrenceType: recurrenceType,
      recurrenceInterval: Number(recurrenceInterval),
      recurrenceAmount: Number(t.recurrence.charAt(2)),
    };
  }

  static toNewTransaction(model: FormModel): NewTransaction {
    const timestamp = new Date(
      model.timestampDate.year,
      model.timestampDate.month - 1,
      model.timestampDate.day,
      Number(model.timestampTime.substr(0, 2)),
      Number(model.timestampTime.substring(3)),
    );
    let recurrenceInterval = model.recurrenceInterval;
    if (model.recurrenceType === RecurrenceType.Monthly) {
      recurrenceInterval = 'm';
    }

    return {
      amount: model.amount,
      category: model.category,
      account: Number(model.account),
      timestamp: timestamp.toISOString(),
      notes: model.notes,
      recurrence: `${recurrenceInterval} ${model.recurrenceAmount}`,
    };
  }

  private static dateToTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}

enum RecurrenceType {
  None = 'n',
  Weekly = 'w',
  Monthly = 'm',
  Custom = 'c',
}
