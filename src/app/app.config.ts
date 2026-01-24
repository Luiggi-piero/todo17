import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import ROUTES_ROOT from './app.routes';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { DemoInterceptor } from './interceptors/demo.interceptor';
import { ErrorApiInterceptorFn } from './interceptors/error-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES_ROOT, withComponentInputBinding(), withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([ErrorApiInterceptorFn]),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DemoInterceptor, multi: true },
  ],
};
