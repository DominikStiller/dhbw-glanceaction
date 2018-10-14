import { Component, OnInit } from '@angular/core';

import { GlanceactionService } from '../../services/glanceaction.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {

  constructor(public g: GlanceactionService,
              public search: SearchService) {
  }

  ngOnInit() {
  }
}
