import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Pokemon, Pokemons, Sprites } from '../shared/pokes-types';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeRepository {
  private readonly API = environment.apiUrl;
  private http = inject(HttpClient);

  getPokes({ page, items }: { page: number; items: number }): Observable<Pokemons> {
    return this.http.get<Pokemons>(`${this.API}/pokemon?limit=${items}&offset=${page}`).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error al obtener personajes', err);
        return of({ count: 0, next: null, previus: null, results: [] });
      })
    );
  }

  getPokeByName(name: string): Observable<Pokemon | null> {
    return this.http.get<Pokemon>(`${this.API}/pokemon/${name}`).pipe(
      map((res) => res),
      catchError((err) => {
        console.error('Error al obtener personaje', err);
        return of(null);
      })
    );
  }

 
}
