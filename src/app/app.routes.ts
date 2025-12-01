import { Routes } from '@angular/router';
import { LoginPage } from './features/login-page/login-page';
import { HomePage } from './features/home-page/home-page';
import { PokeDetailPage } from './features/poke-detail-page/poke-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'poke/:id',
    component: PokeDetailPage,
  },
];
