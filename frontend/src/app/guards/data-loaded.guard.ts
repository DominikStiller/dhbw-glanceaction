import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlanceactionService } from '../services/glanceaction.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataLoadedGuard implements CanActivate {

  constructor(private g: GlanceactionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.g.dataLoaded) {
      return true;
    }
    return this.g.dataLoaded$.pipe(map(() => true));
  }
}
