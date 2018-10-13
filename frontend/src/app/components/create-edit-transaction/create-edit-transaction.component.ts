import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NewTransaction, Transaction } from '../../models/transaction';
import { GlanceactionService } from '../../services/glanceaction.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { Recurrence, RecurrenceType } from '../../models/recurrence';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-transaction',
  templateUrl: './create-edit-transaction.component.html',
  styleUrls: ['./create-edit-transaction.component.scss'],
})
export class CreateEditTransactionComponent implements OnInit {

  // Redeclare so we can use this enum type in the template
  recurrenceType = RecurrenceType;

  @ViewChild('domForm') formDomElement: ElementRef;
  private transactionId: number;
  private model: FormModel;
  creationMode: boolean;

  displayValidation: boolean = false;
  form: FormGroup;

  private navigateBack = {
    next: () => this.location.back(),
    error: error => alert(error),
  };

  constructor(public g: GlanceactionService,
              private fb: FormBuilder,
              private ngbCalendar: NgbCalendar,
              private ngbDateParser: NgbDateParserFormatter,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              public location: Location) {
  }

  ngOnInit() {
    this.model = new FormModel(this.g, this.ngbCalendar, this.datePipe);
    this.form = this.fb.group(this.model);
    this.route.data.subscribe((data) => {
      const t = data.t;
      this.creationMode = t === null;
      if (!this.creationMode) {
        this.transactionId = t.id;
        this.model = FormModel.fromTransaction(t, this.ngbDateParser, this.datePipe);
        this.form = this.fb.group(this.model);
      }
    });
  }

  submit() {
    if (!this.formDomElement.nativeElement.checkValidity()) {
      this.displayValidation = true;
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const newTransaction = FormModel.toNewTransaction(Object.assign({}, this.form.value));
    if (this.creationMode) {
      this.g.createTransaction(newTransaction).subscribe(this.navigateBack);
    } else {
      this.g.updateTransaction(this.transactionId, newTransaction).subscribe(this.navigateBack);
    }
  }

  delete() {
    this.g.deleteTransaction(this.transactionId).subscribe(this.navigateBack);
  }
}

class FormModel {
  amount: number = undefined;
  category: number = 0;
  account: number = undefined;
  timestampDate: NgbDateStruct;
  timestampTime: string;
  notes: string = '';
  recurrenceType: RecurrenceType = RecurrenceType.None;
  recurrenceInterval: number = 0;
  recurrenceAmount: number = 10;

  constructor(g: GlanceactionService,
              ngbCalendar: NgbCalendar,
              datePipe: DatePipe) {
    if (g.accounts.length > 0) {
      this.account = g.accounts[0].id;
    }
    this.timestampDate = ngbCalendar.getToday();
    this.timestampTime = datePipe.transform(new Date(), 'HH:mm');
  }

  static fromTransaction(t: Transaction, dateParser: NgbDateParserFormatter, datePipe: DatePipe): FormModel {
    const r = Recurrence.fromTransaction(t.recurrence);
    return {
      amount: t.amount,
      category: t.category,
      account: t.account,
      timestampDate: dateParser.parse(t.timestamp),
      timestampTime: datePipe.transform(new Date(t.timestamp), 'HH:mm'),
      notes: t.notes,
      recurrenceType: r.type,
      recurrenceInterval: r.interval,
      recurrenceAmount: r.amount,
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

    const recurrence = new Recurrence();
    recurrence.type = model.recurrenceType;
    recurrence.interval = model.recurrenceInterval;
    recurrence.amount = model.recurrenceAmount;

    return {
      amount: model.amount,
      category: model.category,
      account: Number(model.account),
      timestamp: timestamp.toISOString(),
      notes: model.notes,
      recurrence: recurrence.toString(),
    };
  }

  private static dateToTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
