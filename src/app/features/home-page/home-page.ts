import { Component, inject, ResourceRef, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '../../services/pagination';
import { PokeRepository } from '../../services/poke-repository';
import {
  combineLatest,
  combineLatestAll,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../shared/pokes-types';
import { HeroSimpsons } from "../hero/hero";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HeroSimpsons],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  prevPage() {
    this.paginationService.currentPage();
  }
  nextPage() {
    throw new Error('Method not implemented.');
  }
  readonly paginationService = inject(Pagination);
  readonly pokemonService = inject(PokeRepository);
  charactersPerPage = signal(20);

  pokemonResourse = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      items: this.charactersPerPage(),
    }),
    stream: ({ params }) => {
      return this.pokemonService
        .getPokes({
          page: params.page,
          items: params.items,
        })
        .pipe(
          switchMap((data) => {
            const detailRequest = data.results.map((poke) =>
              this.pokemonService.getPokeByName(poke.name)
            );
            return combineLatest(detailRequest).pipe(
              map((pokeDetail) => ({
                ...data,
                results: data.results.map((poke, index) => ({
                  ...poke,
                  details: pokeDetail[index],
                })),
              }))
            );
          })
        );
    },
  });
}
