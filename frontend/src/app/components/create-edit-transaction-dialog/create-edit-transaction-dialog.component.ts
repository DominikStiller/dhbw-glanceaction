import { Component, Input, OnInit } from '@angular/core';
import { NewTransaction, Transaction } from '../../models/transaction';
import { GlanceactionService } from '../../services/glanceaction.service';
import { NgbActiveModal, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-edit-transaction-dialog',
  templateUrl: './create-edit-transaction-dialog.component.html',
  styleUrls: ['./create-edit-transaction-dialog.component.scss'],
})
export class CreateEditTransactionDialogComponent implements OnInit {

  @Input() t: Transaction;
  private model: FormModel;
  creationMode: boolean;

  form: FormGroup;

  constructor(private g: GlanceactionService,
              public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private ngbCalendar: NgbCalendar,
              private ngbDateParser: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.creationMode = this.t === null;
    if (this.creationMode) {
      this.model = new FormModel(this.ngbCalendar);
    } else {
      this.model = FormModel.fromTransaction(this.t, this.ngbDateParser);
    }

    this.form = this.fb.group(this.model);
  }

  submit() {
    const newTransaction = FormModel.toNewTransaction(this.model);
    console.log(newTransaction);
  }

  delete() {
    this.g.deleteTransaction(this.t).subscribe(() => this.activeModal.close());
  }
}

class FormModel {
  amount: number = undefined;
  category: string = null;
  account: number;
  timestampDate: NgbDateStruct;
  timestampTime: string = FormModel.dateToTime(new Date());
  notes: string = '';
  recurrenceInterval: number = 0;
  recurrenceAmount: number = 0;

  constructor(ngbCalendar: NgbCalendar) {
    this.timestampDate = ngbCalendar.getToday();
  }

  static fromTransaction(t: Transaction, dateParser: NgbDateParserFormatter): FormModel {
    return {
      amount: t.amount,
      category: t.category,
      account: t.account,
      timestampDate: dateParser.parse(t.timestamp),
      timestampTime: FormModel.dateToTime(new Date(t.timestamp)),
      notes: t.notes,
      recurrenceInterval: Number(t.recurrence.charAt(0)),
      recurrenceAmount: Number(t.recurrence.charAt(2)),
    };
  }

  static toNewTransaction(model: FormModel): NewTransaction {
    const timestamp = new Date(
      model.timestampDate.year,
      model.timestampDate.month - 1,
      model.timestampDate.day,
      Number(model.timestampTime.substr(0, 2)),
      Number(model.timestampTime.substring(2)),
    );
    return {
      amount: model.amount,
      category: model.category,
      account: model.account,
      timestamp: timestamp.toISOString(),
      notes: model.notes,
      recurrence: model.recurrenceAmount,
      // recurrence: `${model.recurrenceInterval} ${model.recurrenceAmount}`,
    };
  }

  private static dateToTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
