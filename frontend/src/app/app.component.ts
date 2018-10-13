import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(public search: SearchService,
              private router: Router) {
  }
}
