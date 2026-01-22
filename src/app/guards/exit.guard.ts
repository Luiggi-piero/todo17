//#region Forma moderna
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

// Angular vinculara la interface al componente que al cual lo hayas definido(en app.routes.ts o tu modulo de rutas)
export interface CanComponentDeactive {
  canDeactivate: () => Observable<boolean> | boolean;
}

export const ExitGuardFn: CanDeactivateFn<CanComponentDeactive> = (
  component: CanComponentDeactive,
) => {
  const dialog = inject(MatDialog);
  const formularioValido = component.canDeactivate();
  // el formulario tiene al menos un dato y mostramos el dialog(ConfirmDialogComponent)
  if (formularioValido) {
    const reference = dialog.open(ConfirmDialogComponent);
    return reference.afterClosed(); // valor de la repuesta de ConfirmDialogComponent(true/false ver su html) en un observable
  }
  return true;
};

//#endregion

//#region Forma clasica
// import { inject, Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import {
//   ActivatedRouteSnapshot,
//   CanDeactivate,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

// // Angular vinculara la interface al componente que al cual lo hayas definido(en app.routes.ts o tu modulo de rutas)
// export interface CanComponentDeactive {
//   canDeactivate: () => Observable<boolean> | boolean;
// }

// /**
//  * CanDeactivate<unknown>  : es unknown porque no sabemos en que componente se utilizara
//  * - unknown podria ser RegisterPageComponent
//  * - pero solo funcionaria para este componente
//  * - si quiero usarlo para otros componentes? no resultaria
//  * - para solucionar esto usamos la interface para inyectar la funcionalidad a la instancia del componente
//  * que definiste en la ruta(app.routes o el modulo de rutas)
//  * - ahora puedo implementar esta interface en cualquier componente
//  * - ahora nuestro componente(por ejemplo el registro) puede implementar CanComponentDeactive
//  * y vincularse a este guard para poder controlarlo
//  * - podemos acceder a los datos del componente a través de component
//  *
//  * CONCLUSIÓN
//  * - Nuestro CanDeactive recibe una interface CanComponentDeactive
//  * - Nuestro compomente implementa esta interface
//  * - Entonces el guard puede vinvularse a cualquier componente que implemente esta interface
//  * - La interface se implementa en cualquier componente que quiera usar este guard
//  */
// @Injectable({ providedIn: 'root' })
// export class ExitGuard implements CanDeactivate<CanComponentDeactive> {
//   dialog = inject(MatDialog);

//   canDeactivate(
//     component: CanComponentDeactive,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState: RouterStateSnapshot,
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     console.log('###### ExitGuard #######');
//     const formularioValido = component.canDeactivate();
//     if (formularioValido) {  // el formulario tiene al menos un dato y mostramos el dialog(ConfirmDialogComponent)
//       const reference = this.dialog.open(ConfirmDialogComponent);
//       return reference.afterClosed(); // valor de la repuesta de ConfirmDialogComponent(true/false ver su html) en un observable
//     }
//     return true;
//   }
// }
//#endregion
