import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IApiResponseProduct } from '../../../services/models/product-api.interface';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [MatCardModule, MatButtonModule],
})
export class ProductComponent {
  @Input({ required: true }) product!: IApiResponseProduct;

  private readonly _cartService = inject(CartService);

  clickAdToCart(): void {
    this._cartService.addToCart(this.product);
  }
}
