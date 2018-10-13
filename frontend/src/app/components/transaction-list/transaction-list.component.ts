import { Component, OnInit, Input } from '@angular/core';
import { GlanceactionService } from '../../services/glanceaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {

  constructor(public g: GlanceactionService,
              public search: SearchService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
  }
}
