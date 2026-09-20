import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: '<h1>Inicio</h1>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
