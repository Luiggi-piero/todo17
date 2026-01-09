import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',  // como solo tenemos una linea, pero si hay mas de 1, usa el archivo html
})
export class AppStandaloneComponent {
  title = 'todo17';
}
