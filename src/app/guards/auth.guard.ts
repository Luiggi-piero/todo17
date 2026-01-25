//#region Enfoque clasico
// import { inject, Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   private router = inject(Router);

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): boolean {
//     // ver la ruta
//     console.log(route);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       this.router.navigateByUrl('/');
//       return false;
//     }

//     return true;
//   }
// }
//#endregion

//#region Enfoque moderno
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const AuthGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  console.log('###### AuthGuardFn #########');
  // ver la ruta
  console.log(route);

  const token = localStorage.getItem('token');
  if (!token) {
    const router = inject(Router);
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
//#endregion
