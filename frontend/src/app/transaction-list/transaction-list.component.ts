import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.backend.getTransactions().subscribe(d => this.transactions = d);
  }
}
