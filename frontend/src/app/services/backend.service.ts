import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category>(this.url('categories'));
  }

  private url(path: string) {
    return `${environment.apiBase}/${path}`;
  }
}
