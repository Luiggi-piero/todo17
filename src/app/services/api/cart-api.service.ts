import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseCart } from '../models/cart-api.interface';

@Injectable()
export class CartApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly URL_SINGLE_CART = 'https://fakestoreapi.com/carts/user/2';

  constructor() {
    console.log('#########CartApiService#########');
  }

  getSingleCart(): Observable<IApiResponseCart> {
    return this._httpClient.get<IApiResponseCart>(this.URL_SINGLE_CART);
  }
}
