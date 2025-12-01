import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokeRepository } from '../../services/poke-repository';

@Component({
  selector: 'app-poke-detail-page',
  templateUrl: './poke-detail-page.html',
  styleUrl: './poke-detail-page.css',
})
export class PokeDetailPage {
  private activatedRoute = inject(ActivatedRoute);
  private pokemonService = inject(PokeRepository);
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
