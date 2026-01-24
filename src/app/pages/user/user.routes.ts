import { Routes } from '@angular/router';
import { UserBasicComponent } from './user-basic/user-basic.component';
import { UserAdminComponent } from './user-admin/user-admin.component';

// el guard can match tiene que devolver un true o false
// - entonces puedes omitir esto y crear tu propio metodo que vuelva true/false
// y llamarlo directamente en can match
// import { inject } from '@angular/core';
// import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

// export const NameGuard: CanMatchFn = (
//     route: Route,
//     segments: UrlSegment[]
// ) => {
//     return true;
// }

// para conocer si tiene el rol esperado: role
const isRole = (role: string) => {
  const roleLogged = localStorage.getItem('role');
  return roleLogged === role;
};

export default [
  {
    path: '', // localhost:4200/user
    canMatch: [() => isRole('basic')],
    component: UserBasicComponent,
  },
  {
    path: '', // localhost:4200/user
    canMatch: [() => isRole('admin')],
    component: UserAdminComponent,
  },
] as Routes;
