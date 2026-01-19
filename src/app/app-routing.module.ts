import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import FullProductDetailsPageComponent from './pages/payment-page/full-product-details-page/full-product-details-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { SimpleProductDetailPageComponent } from './pages/payment-page/simple-product-detail-page/simple-product-detail-page.component';
// import { ProductsResolverService } from './services/products.resolver';

const routes: Routes = [
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
  {
    path: '404',
    component: NotFoundPageComponent,
  },
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
    path: 'payment/:user',
    component: PaymentPageComponent,
    data: {
      title: 'Pagos',
    },
    // resolve: { products: ProductsResolverService },
    children: [
      {
        path: 'simple-product-detail',
        component: SimpleProductDetailPageComponent,
      },
      {
        path: '', // Ruta raiz   ->   http://localhost:4200/payment/algo
        redirectTo: 'simple-product-detail',
        pathMatch: 'full',
      },
      {
        path: 'full-product-details',
        component: FullProductDetailsPageComponent,
      },
    ],
  },

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class RoutingModule {}
