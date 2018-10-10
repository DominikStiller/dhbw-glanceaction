import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../../services/glanceaction.service';
import { Transaction } from '../../models/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditTransactionDialogComponent }
  from '../create-edit-transaction-dialog/create-edit-transaction-dialog.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  searchTerm: string = '';

  constructor(public g: GlanceactionService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  createTransaction() {
    const modalRef = this.modalService.open(CreateEditTransactionDialogComponent, { size: 'lg' });
    modalRef.componentInstance.t = null;
  }

  editTransaction(t: Transaction) {
    const modalRef = this.modalService.open(CreateEditTransactionDialogComponent, { size: 'lg' });
    modalRef.componentInstance.t = t;
  }
}
