import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly _route = inject(Router);

  clickSingUp(): void {
    // this._route.navigateByUrl('/home', { state: { isAdmin: true } });
    this._route.navigate(['/home'], {
      queryParams: { user: 'luiggi', edad: 33 },
      state: { isAdmin: true },
    });
  }
}
