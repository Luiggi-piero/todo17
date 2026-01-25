import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // req: es inmutable, se debe clonar si quieres cambiar algo
    if (req.url.includes('white_')) {
      // No necesita el token
      const requestClone = req.clone({ url: this.cleanWhiteUrl(req.url) });
      return next.handle(requestClone);
    }

    // 👇 Solo en navegador
    if (isPlatformBrowser(this.platformId)) {
      // Agregamos un header con el token
      const headers = req.headers.set(
        'Authorization',
        localStorage.getItem('token')!,
      );

      // Se crea una copia de la petición original
      // Esta copia ya incluye el header token
      const requestClone = req.clone({ headers });

      // la peticion modificada debe continuar hacia el servidor
      // console.log(req);
      return next.handle(requestClone);
    }

    // Si no hay token o estamos en SSR
    return next.handle(req);
  }

  private cleanWhiteUrl(url: string) {
    return url.replace('white_', '');
  }
}
