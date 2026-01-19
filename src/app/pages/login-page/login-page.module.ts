import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginPageComponent } from './login-page.component';

import { RouterModule, Routes } from '@angular/router';
import { DemoService } from '../../services/demo.service';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '', // en la ruta actual
    component: LoginPageComponent, // muestra este component
  },
];

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent],
  providers: [DemoService],
})
export class LoginPageModule {}
