import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn == true) {
      return true
    }
    
    /* Routing only for admin - optional 
      return this.authService.user$.pipe(
        take(1),
        map(user => user && user.roles.admin ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied - Admins only')
          }
        })
      );*/
  }
}
