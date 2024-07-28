import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';


@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrlService: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  /*
  Esto retorna una observableCollection de heroes que son recogidos
   baseUrlService que es (environments.baseUrl)/heroes

   NOTA: environments.baseUrl = 'http://localhost:3000'
  */
  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrlService }/heroes`);
  }

  getHeroById ( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${ this.baseUrlService }/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  getSuggestions( query :string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrlService }/heroes?q=${ query }&_limit=6`)
  }


  addHero( heroAdded: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrlService }/heroes`, heroAdded)
  }

  updateHero( heroUpdated: Hero): Observable<Hero> {

    if( !heroUpdated.id )
      throw Error('Hero id is required')

    return this.http.patch<Hero>(`${ this.baseUrlService }/heroes/${ heroUpdated.id }`, heroUpdated)
  }

  deleteHeroById( id: string): Observable<boolean> {

    return this.http.delete(`${ this.baseUrlService }/heroes/${ id }`)
      .pipe(
        map( resp => true),
        catchError( error => of(false))
      )
  }

}
