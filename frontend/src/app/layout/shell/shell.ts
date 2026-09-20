import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected readonly usuario = this.auth.usuario;
  protected readonly tabs = [
    { path: 'home', label: 'Inicio' },
    { path: 'example', label: 'Ejemplo' },
  ];

  protected salir(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
