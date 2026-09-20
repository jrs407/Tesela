import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Auth } from '../../core/services/auth';

/**
 * Componente = clase (logica) + plantilla HTML + estilos. Es standalone: declara sus propias
 * dependencias en `imports` (no hay NgModules). Equivale a un componente de React.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  // OnPush: solo se re-renderiza cuando cambia un signal/input usado en la plantilla.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Formulario reactivo: el estado vive en TypeScript (no en el HTML). Cada FormControl guarda
   * su valor, si es valido, si fue tocado... A diferencia de React, no re-renderiza todo en
   * cada tecla: solo actualiza lo que depende de ese control.
   */
  protected readonly form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasenia: ['', Validators.required],
  });

  protected readonly cargando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // fuerza a mostrar los errores de validacion
      return;
    }

    this.cargando.set(true);
    this.error.set(null);

    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl(this.destino()),
        error: (err) =>
          this.error.set(
            err.status === 401 ? 'Correo o contraseña incorrectos' : 'No se pudo conectar',
          ),
      });
  }

  /** Vuelve a la pagina que se intentaba abrir, aceptando solo rutas internas. */
  private destino(): string {
    const volver = this.route.snapshot.queryParamMap.get('returnUrl');
    return volver && volver.startsWith('/') && !volver.startsWith('//') ? volver : '/home';
  }
}
