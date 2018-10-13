import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  term: string;

  constructor() {
    this.reset();
  }

  public reset() {
    this.term = '';
  }
}
