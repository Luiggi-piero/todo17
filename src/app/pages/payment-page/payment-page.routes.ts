import { Routes } from '@angular/router';
import { PaymentPageComponent } from './payment-page.component';
import { SimpleProductDetailPageComponent } from './simple-product-detail-page/simple-product-detail-page.component';

export default [
  {
    path: '', // Ruta principal -> payment/:user
    component: PaymentPageComponent,
    children: [
      {
        path: 'simple-product-detail', //  payment/:user/simple-product-detail
        component: SimpleProductDetailPageComponent, // se carga inmediatamente, por eso no es lazy
      },
      {
        path: 'full-product-details', //  payment/:user/full-product-details
        loadComponent: () =>
          // Carga lazy del componente standalone
          import(
            './full-product-details-page/full-product-details-page.component'
          ),
      },
      {
        path: '', // Ruta raiz   ->   http://localhost:4200/payment/algo
        redirectTo: 'simple-product-detail',
        pathMatch: 'full',
      },
    ],
  },
] as Routes;
