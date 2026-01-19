import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../../services/demo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthApiService } from '../../services/api/auth-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  // providers: [DemoService]
})
export class LoginPageComponent {
  private readonly _route = inject(Router);
  private readonly _demoService = inject(DemoService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);

  form = this._formBuilder.nonNullable.group({
    username: ['mor_2314', Validators.required],
    password: ['83r5^_', Validators.required],
  });

  clickSingUp(): void {
    // this._route.navigateByUrl('/home', { state: { isAdmin: true } });
    // this._route.navigate(['/home'], {
    //   queryParams: { user: 'luiggi', edad: 33 },
    //   state: { isAdmin: true },
    // });
    this._authApiService.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
      },
      error: (e) => {
        console.log('UPS UN ERROR, manejado desde el componente', e);
      },
    });
  }
}
