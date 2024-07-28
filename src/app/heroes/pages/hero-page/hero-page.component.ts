import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public heroFinded?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) { }

  /*
  ngOnInit(): void {
    this.activatedRouted.params
    .pipe(

    ).subscribe( params => {
        console.log({ params })
      })

  }
  */

  ngOnInit(): void {
    this.activatedRouted.params
    .pipe(
      delay(5000),
      switchMap( ({ id }) => this.heroesService.getHeroById( id )  )
    ).subscribe( hero => {
        if(!hero ) return this.router.navigate(['heroes/list'])
        this.heroFinded = hero;
        console.log({hero})
        return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }

}
