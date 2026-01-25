import { Routes } from '@angular/router';

import { AuthGuardFn } from './guards/auth.guard';
import { ExitGuardFn } from './guards/exit.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductsResolverServiceFn } from './services/products.resolver';

// const isRole = (role: string) => {
//   const roleLogged = localStorage.getItem('role');
//   return roleLogged === role;
// };

export default [
  {
    path: 'home',
    title: 'Bienvenido! home',
    component: HomePageComponent,
  },
  {
    path: '', // ruta raiz(dominio) -> http://localhost:4200   lleva a -> http://localhost:4200/home
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // {
  //   path: '404',
  //   component: NotFoundPageComponent,
  // },
  {
    path: 'login',
    title: 'Inicio de Sesión',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule,
      ),
  },
  {
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'prefix', // valores que llevan a /login  -> /login/algo-raro   /login/algo-mas
  },
  {
    path: 'register',
    title: 'Registro',
    canDeactivate: [ExitGuardFn],
    loadComponent: () =>
      import('./pages/register-page/register-page.component'),
  },
  {
    path: 'payment/:user',
    canActivate: [AuthGuardFn],
    data: {
      title: 'Pagos',
    },
    // Antes de renderizarse el componente, el resolve tiene que terminar de producir los datos
    resolve: { products: ProductsResolverServiceFn },
    loadChildren: () => import('./pages/payment-page/payment-page.routes'), // carga el archivo de rutas
  },
  {
    path: 'user',
    title: 'Usuarios',
    loadChildren: () => import('./pages/user/user.routes'),
  },
  // {
  //   path: 'user',
  //   children: [
  //     {
  //       path: '',
  //       canMatch: [() => isRole('basic')],
  //       component: UserBasicComponent,
  //     },
  //     {
  //       path: '',
  //       canMatch: [() => isRole('admin')],
  //       component: UserAdminComponent,
  //     },
  //   ],
  // },

  //#region Forma 1 para redirigir
  // {
  //   path: '**', // cualquier ruta que NO exista.
  //   redirectTo: '/404',
  //   // Debe coincidir la url con el path
  //   // Ejemplo
  //   // - url: /xyz    path: cualquier otra no definida  -> coinciden? SI  -> redirige a /404
  //   // - url: /algo   path: cualquier otra no definida  -> coinciden? SI  -> redirige a /404
  //   pathMatch: 'full'
  // },
  //#endregion

  //#region Forma 2 para redirigir
  {
    path: '**', // cualquier otra ruta
    component: NotFoundPageComponent,
  },
  //#endregion
] as Routes;
