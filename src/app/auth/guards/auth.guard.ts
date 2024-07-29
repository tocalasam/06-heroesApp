import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  checkAuthStatus(): Observable<boolean> | boolean {
    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if (!isAuthenticated)
          this.router.navigate(['./auth/login'])
      })
    );
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
   /*  console.log('can Activate');
    console.log({ route, state })
    return false; */
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    /*  console.log('can Math')
    console.log({ route, segments })
    return false; */
    return this.checkAuthStatus();
  }

}
