import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { GlanceactionService } from '../../services/glanceaction.service';
import { Transaction } from '../../models/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditTransactionComponent }
  from '../create-edit-transaction/create-edit-transaction.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  searchTerm: string = '';

  constructor(public g: GlanceactionService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
  }

  createTransaction() {
    this.router.navigate(['/create']);
  }

  editTransaction(t: Transaction) {
    this.router.navigate(['/edit', t.id]);
  }
}
