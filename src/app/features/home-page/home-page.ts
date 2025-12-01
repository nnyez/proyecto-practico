import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '../../services/pagination';
import { PokeRepository } from '../../services/poke-repository';
import { Observable } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  readonly paginationService = inject(Pagination);
  readonly pokemonService = inject(PokeRepository);
  charactersPerPage = signal(20);

  

  pokemonResourse = rxResource({
    params: () => ({
      page: (this.paginationService.currentPage())   ,
      items: this.charactersPerPage(),
    }),
    stream: ({ params }) => {
      return this.pokemonService.getPokes({
        page: params.page,
        items: params.items,
      });
    },
  });
}

