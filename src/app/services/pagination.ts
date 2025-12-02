import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pagination {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private offset = signal(0);
  constructor() {
    effect(() => {
      const page = this.currentPage();
      if (page > 0) {
        this.offset.set(page); 
      }
    });
  }

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('offset') ? +params.get('offset')! : this.offset())),
      map((offset) => (isNaN(offset) ? 0 : offset))
    ),
    { initialValue: 0 }
  );
}
