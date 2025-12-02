import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokeRepository } from '../../services/poke-repository';
import { Pagination } from '../../services/pagination';

@Component({
  selector: 'app-poke-detail-page',
  templateUrl: './poke-detail-page.html',
  styleUrl: './poke-detail-page.css',
  imports: [RouterLink],
})
export class PokeDetailPage {
  private activatedRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokeRepository);
  readonly paginationService = inject(Pagination);
  constructor() {
    console.log(this.pokemonDetail);
  }
  pokemonDetail = rxResource({
    params: () => ({
      name: this.activatedRoute.snapshot.paramMap.get('id') || '',
    }),
    stream: ({ params }) => {
      return this.pokemonService.getPokeByName(params.name);
    },
  });
}
