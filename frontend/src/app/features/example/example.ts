import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<h1>Ejemplo</h1>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {}
