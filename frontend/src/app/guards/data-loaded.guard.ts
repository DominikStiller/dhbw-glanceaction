import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlanceactionService } from '../services/glanceaction.service';

/** Router guard which only lets a page load if all data has been loaded */
@Injectable({
  providedIn: 'root',
})
export class DataLoadedGuard implements CanActivate {

  constructor(private g: GlanceactionService) {
  }

  canActivate(): Observable<boolean> {
    // Return immediately if data has already been loaded
    if (this.g.dataLoaded) {
      return of(true);
    }
    // Block if data is still loading
    return this.g.dataLoaded$.pipe(map(() => true));
  }
}
