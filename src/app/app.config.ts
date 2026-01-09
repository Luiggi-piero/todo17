import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import ROUTES_ROOT from './app.routes';
import { LoginPageModule } from './pages/login-page/login-page.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES_ROOT, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    // importProvidersFrom(LoginPageModule),
  ],
};
