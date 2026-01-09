//#region Resolve - Versión nueva

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { IApiResponseProduct } from './models/product-api.interface';
import { ProductsApiService } from './products-api.service';

export const ProductsResolverServiceFn: ResolveFn<IApiResponseProduct[]> = (
  route: ActivatedRouteSnapshot
) => {
  const _productsApiService = inject(ProductsApiService);
  console.log('Productos desde el resolver', route);
  return _productsApiService.getProducts();
};
//#endregion

//#region Resolve - version antigua (tambien funciona)
// import { inject, Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { delay, Observable } from 'rxjs';
// import { IApiResponseProduct } from './models/product-api.interface';
// import { ProductsApiService } from './products-api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductsResolverService implements Resolve<IApiResponseProduct[]> {
//   private readonly _productsApiService = inject(ProductsApiService);

//   // route : ruta actual al que se quiere acceder
//   resolve(route: ActivatedRouteSnapshot): Observable<IApiResponseProduct[]> {
//     console.log('Productos desde el resolver', route);
//     // return this._productsApiService.getProducts().pipe(delay(3000));
//     return this._productsApiService.getProducts();
//   }
// }
//#endregion
