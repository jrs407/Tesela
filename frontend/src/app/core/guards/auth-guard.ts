import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Auth } from '../services/auth';

/**
 * Un guard decide si se puede entrar a una ruta. Devuelve true (pasa) o un UrlTree (redirige).
 * Es una simple funcion; puede usar inject() porque Angular la ejecuta en contexto de inyeccion.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(Auth).autenticado()) {
    return true;
  }
  // Guardamos a donde queria ir para volver alli despues del login.
  return inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
