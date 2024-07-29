import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';



@Injectable({providedIn: 'root'})
export class AuthService {

  private baserUrlService = environments.baseUrl;
  private userLogin?: User;

  constructor(private http: HttpClient) {
  }

  get currentUser(): User | undefined {
    if( !this.userLogin )
      return undefined;

    return structuredClone(this.userLogin);
  }

  login( email: string, password: string): Observable<User> {

    return this.http.get<User>(`${ this.baserUrlService}/users/1`).
      pipe(
        tap( user => { this.userLogin = user; }), // coge el usuario
        tap( user => localStorage.setItem('token', 'aASDFsfasdasdf.asdfasdfss.123lkjijss.')),  // coge el
      )
  }

  logOut(){
    this.userLogin = undefined;
    localStorage.clear();
  }


  checkAuthentication(): Observable<boolean>  {
      if( !localStorage.getItem('token'))
        return of (false);

      const token = localStorage.getItem('token')

      return this.http.get<User>(`${ this.baserUrlService }/users/1`)
      .pipe(
        tap( user => this.userLogin = user),
        // user = seria el objeto
        // !user = false (ausencia de valores en el objeto "user" -> false)
        // !!user = true (lo opuesto a !user -> true)
        map( user => !!user),
        catchError( err => of(false))
      )
  }
}
