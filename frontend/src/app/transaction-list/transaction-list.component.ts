import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[];

  constructor(private backend: BackendService) {
  }

  ngOnInit() {
    this.backend.getCategories().subscribe(d => console.log(d));
    this.transactions = [
      { id: 15, amount: 30.25, timestamp: new Date(), account: 4444 },
      { id: 15, amount: 3.97, timestamp: new Date(), account: 4444 },
      { id: 15, amount: 145.12, timestamp: new Date(), account: 4444 },
    ];
  }

}
