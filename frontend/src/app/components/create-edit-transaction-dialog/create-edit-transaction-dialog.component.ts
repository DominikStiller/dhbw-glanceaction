import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { GlanceactionService } from '../../services/glanceaction.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private g: GlanceactionService, public activeModal: NgbActiveModal, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.creationMode = this.t === null;
    if (this.creationMode) {
      this.model = new FormModel();
    } else {
      this.model = FormModel.fromTransaction(this.t);
    }

    this.form = this.fb.group(this.model);
  }

  submit() {

  }

  delete() {
    this.g.deleteTransaction(this.t).subscribe(() => this.activeModal.close());
  }
}

class FormModel {
  amount: number;
  category: string;
  account: number;
  timestampDate: string;
  timestampTime: string;
  notes: string;
  recurrenceInterval: number;
  recurrenceAmount: number;

  static fromTransaction(t: Transaction): FormModel {
    return {
      amount: t.amount,
      category: t.category,
      account: t.account,
      timestampDate: t.timestamp.toISOString(),
      timestampTime: t.timestamp.toISOString(),
      notes: t.notes,
      recurrenceInterval: Number(t.recurrence.charAt(0)),
      recurrenceAmount: Number(t.recurrence.charAt(2)),
    };
  }
}
