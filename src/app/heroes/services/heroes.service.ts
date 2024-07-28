import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
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
    return this.http.get<Hero[]>(`${ this.baseUrlService }/heroes?superhero_like=${ query }&_limit=3`)
  }
}
