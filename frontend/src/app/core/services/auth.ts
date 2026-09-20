import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { LoginRequest, LoginResponse, UsuarioSesion } from '../../shared/models/auth';

const CLAVE_SESION = 'tesela.sesion';

/**
 * Un servicio es una clase con estado/logica compartida. `providedIn: 'root'` = una unica
 * instancia para toda la app (singleton). Se pide con inject(Auth), sin constructor.
 */
@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  // La app se pre-renderiza en el servidor (SSR) y alli no existe localStorage.
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * signal = valor reactivo (como useState de React, pero se lee llamandolo: this._sesion()).
   * Cualquier plantilla o computed que lo lea se actualiza sola cuando cambia.
   */
  private readonly _sesion = signal<LoginResponse | null>(this.leerSesionGuardada());

  /** Vistas de solo lectura del signal, para que nadie de fuera pueda modificarlo. */
  readonly usuario = computed<UsuarioSesion | null>(() => this._sesion()?.usuario ?? null);
  readonly token = computed(() => this._sesion()?.token ?? null);
  /** computed = valor derivado (como useMemo), se recalcula solo cuando cambian sus signals. */
  readonly autenticado = computed(() => this._sesion() !== null);

  /**
   * HttpClient devuelve Observables de RxJS (no Promesas). Son "perezosos": la peticion
   * no se envia hasta que alguien hace .subscribe(). `tap` ejecuta un efecto secundario
   * (guardar la sesion) sin alterar el valor que le llega al que se suscribe.
   */
  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/api/auth/login', credenciales)
      .pipe(tap((respuesta) => this.guardarSesion(respuesta)));
  }

  logout(): void {
    this._sesion.set(null);
    if (this.esNavegador) {
      localStorage.removeItem(CLAVE_SESION);
    }
  }

  private guardarSesion(sesion: LoginResponse): void {
    this._sesion.set(sesion);
    if (this.esNavegador) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    }
  }

  private leerSesionGuardada(): LoginResponse | null {
    if (!this.esNavegador) {
      return null;
    }
    try {
      const guardada = localStorage.getItem(CLAVE_SESION);
      return guardada ? (JSON.parse(guardada) as LoginResponse) : null;
    } catch {
      return null;
    }
  }
}
