import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { IApiResponseProduct } from '../../services/models/product-api.interface';
import { ProductComponent } from './product/product.component';
import { DemoService } from '../../services/demo.service';
import { ProductsApiService } from '../../services/api/products-api.service';

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
    RouterLink,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  @Input() user?: string;
  count = 0;
  // private: si no lo vas a usar en el html
  // _   : significa que solo se usa aqui en el controlador/archivo ts
  private readonly _productsApiService = inject(ProductsApiService); // accediendo a la instancia de esa clase/servicio
  readonly cartApiService = inject(CartService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _demoService = inject(DemoService);

  products: IApiResponseProduct[] = [];
  products$!: Observable<IApiResponseProduct[]>;

  constructor() {
    console.log(
      'Navigation:',
      this._router.getCurrentNavigation()?.extras.state
    );
  }

  ngOnInit(): void {
    // this._productsApiService.getProducts().subscribe({
    //   next: (data) => (this.products = data),
    // });
    this.products$ = this._productsApiService.getProducts();

    // this._cartApiService.cartObservable$.subscribe({
    //   next: (number) => (this.count = number),
    // });
    this._getValueRoutes();
  }

  private _getValueRoutes() {
    console.log(
      'Valores obtenidos por query params',
      this._activatedRoute.snapshot.queryParams
    );

    // mejor usar esto para acceder solo al query param exacto
    console.log(
      'Valores obtenidos por query params',
      this._activatedRoute.snapshot.queryParamMap.get('user')
    );

    console.log('@Input', this.user);
  }
}
