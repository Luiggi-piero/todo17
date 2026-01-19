import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseProduct } from '../models/product-api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  // cuando se levante la app ya va a existir la instancia de esta clase
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly URL_PRODUCTS = `${environment.domain}/products`;

  httpClient = inject(HttpClient);

  constructor() {
    console.log('products service');
  }

  getProducts() {
    return this.httpClient.get<IApiResponseProduct[]>(this.URL_PRODUCTS);
  }
}
