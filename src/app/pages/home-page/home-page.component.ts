import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

import { ProductsApiService } from '../../services/products-api.service';
import { ProductComponent } from './product/product.component';
import { IApiResponseProduct } from '../../services/models/product-api.interface';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    ProductComponent,
    AsyncPipe,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  count = 0;
  // private: si no lo vas a usar en el html
  // _   : significa que solo se usa aqui en el controlador/archivo ts
  private readonly _productsApiService = inject(ProductsApiService); // accediendo a la instancia de esa clase/servicio
  readonly cartApiService = inject(CartService);

  products: IApiResponseProduct[] = [];
  products$!:Observable<IApiResponseProduct[]>;

  ngOnInit(): void {
    // this._productsApiService.getProducts().subscribe({
    //   next: (data) => (this.products = data),
    // });
    this.products$ = this._productsApiService.getProducts();

    // this._cartApiService.cartObservable$.subscribe({
    //   next: (number) => (this.count = number),
    // });
  }
}
