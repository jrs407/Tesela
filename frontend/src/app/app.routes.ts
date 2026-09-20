import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard], // protege el Shell y, con el, todas sus rutas hijas
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'example',
        loadChildren: () =>
          import('./features/example/example.routes').then((m) => m.EXAMPLE_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
