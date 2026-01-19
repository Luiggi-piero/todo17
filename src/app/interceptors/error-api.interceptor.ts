import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const ErrorApiInterceptorFn: HttpInterceptorFn = (req, next) => {
  console.log('---ErrorApiInterceptorFn--->', req);
  const _snackBar = inject(MatSnackBar);
  // req: es inmutable, se debe clonar si quieres cambiar algo

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == HttpStatusCode.Unauthorized) {
        // es code HTTP 401
        _snackBar.open('No tienes acceso amigo', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        _snackBar.open('Sucedió un error inesperado, intenta más tarde', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
      return throwError(() => error); // seguimos propagando el error
    }),
  );
};
