import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})

export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService :HeroesService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';

    console.log(value)
    this.heroesService.getSuggestions(value)
    .subscribe(
      heroes => this.heroes = heroes
    )
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    console.log(event.option.value);
    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    this.selectedHero = event.option.value;
    this.searchInput.setValue( this.selectedHero!.superhero)


  }
}
