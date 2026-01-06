import { Component, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss',
  imports: [RouterOutlet, RouterLink, MatButton, MatIconButton, MatIcon],
})
export class PaymentPageComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute); // representa la ruta actual activa
  private readonly _router = inject(Router); // sirve para navegar programáticamente

  ngOnInit(): void {
    console.log(
      'Datos enviados por params',
      this._activatedRoute.snapshot.params
    );

    console.log(
      'Datos enviados por el data property => ',
      this._activatedRoute.snapshot.data
    );
  }

  clickViewFullDetail(): void {
    /**
     * './'
     * - navegación relativa
     * - no cambies de nivel, solo agrega/reemplaza la ruta hija
     * - No toca /payment/:user que es la ruta padre
     * - define cómo se construye la ruta, en este caso es relativa
     *
     *
     * 'full-product-details'
     * - modifica solo la ruta hija por esto
     */
    this._router.navigate(['./', 'full-product-details'], {
      // relativeTo: this._activatedRoute
      // - ruta actual = ruta padre
      // - Le dice a Angular: “Navega relativo a la ruta actual”
      // Sin esto, Angular navegaría desde la raíz (/),
      // esa ruta padre es /payment/kronos
      // - Sin relativeTo, Angular navega desde / (raíz) y perderías el padre.
      // 👉 Se mantiene(la ruta padre) por relativeTo: this._activatedRoute; ./ solo complementa la navegación relativa.
      relativeTo: this._activatedRoute,
      queryParamsHandling: 'preserve', // No se pierden los query params actuales
    });
  }
}
