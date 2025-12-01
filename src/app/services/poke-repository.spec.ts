import { TestBed } from '@angular/core/testing';

import { PokeRepository } from './poke-repository';

describe('PokeRepository', () => {
  let service: PokeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
