import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-home',
  template: '<h1>Hola, {{ usuario()?.nombre }} {{ usuario()?.apellidos }}</h1>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly usuario = inject(Auth).usuario;
}
