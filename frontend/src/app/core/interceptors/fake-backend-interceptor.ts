import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

import { LoginRequest, LoginResponse } from '../../shared/models/auth';

/**
 * TEMPORAL: simula el backend mientras no exista. BORRAR este archivo (y quitarlo de app.config.ts)
 * cuando el endpoint POST /api/auth/login de Spring este hecho.
 *
 * Un interceptor es un "middleware" de HttpClient: ve cada peticion antes de que salga. Aqui,
 * en vez de dejarla salir (next(req)), respondemos nosotros.
 * Credenciales de prueba: ana@mail.com / 1234
 */
export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (!(req.method === 'POST' && req.url === '/api/auth/login')) {
    return next(req);
  }

  const { correo, contrasenia } = req.body as LoginRequest;

  if (correo === 'ana@mail.com' && contrasenia === '1234') {
    const cuerpo: LoginResponse = {
      token: 'token-falso',
      usuario: { id: '1', correo, nombre: 'Ana', apellidos: 'Perez Gil' },
    };
    return of(new HttpResponse({ status: 200, body: cuerpo })).pipe(delay(500));
  }

  // delay() no retrasa los errores, por eso usamos timer + mergeMap.
  return timer(500).pipe(
    mergeMap(() =>
      throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })),
    ),
  );
};
