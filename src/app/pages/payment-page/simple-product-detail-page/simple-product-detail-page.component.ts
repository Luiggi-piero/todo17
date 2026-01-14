import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';

interface ICartProduct {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const PRODUCTS: ICartProduct[] = [
  { name: 'Mens Casual Slim Fit', price: 109.95, quantity: 2, total: 219.9 },
  {
    name: "ohn Hardy Women's Legends Naga Gold & Silver Dragon",
    price: 695,
    quantity: 1,
    total: 695,
  },
  {
    name: 'ierced Owl Rose Gold Plated Stainless Steel Double',
    price: 10.99,
    quantity: 1,
    total: 10.99,
  },
];

@Component({
  selector: 'app-simple-product-detail-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    JsonPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './simple-product-detail-page.component.html',
  styleUrl: './simple-product-detail-page.component.scss',
})
export class SimpleProductDetailPageComponent implements OnInit {
  private readonly _activadedRoute = inject(ActivatedRoute);
  private readonly _formBuilder = inject(FormBuilder);

  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'action'];

  form = this._formBuilder.group({
    total: PRODUCTS.reduce((prev, current) => prev + current.total, 0),
    products: this._formBuilder.array(
      PRODUCTS.map((p) => this._createFormGroup(p))
    ),
  });

  // La fuente de datos es un arreglo de form group, entonces en el html cada let element será un form group
  dataSource = new MatTableDataSource(this.form.controls.products.controls);
  // dataSource = PRODUCTS;

  ngOnInit(): void {
    this._calculateRowTotal();
    console.log(
      'Data property => ',
      this._activadedRoute.parent?.snapshot.data // Leer datos del parent route
    );
    console.log(
      'Path params => ',
      this._activadedRoute.parent?.snapshot.paramMap.get('user') // Leer datos del parent route
    );
  }

  // por cada producto se crea un formulario(form group)
  private _createFormGroup(product: ICartProduct) {
    return this._formBuilder.group({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      total: product.total,
    });
  }

  private _calculateRowTotal() {
    // this.productsFormArray.controls : son los form group del form array
    this.productsFormArray.controls.forEach(
      ({ controls: { quantity, price, total } }) => {
        /** 
         * { controls: { quantity, price, total } }
         * equivale a escribir
         * (obj) => {
            const quantity = obj.controls.quantity;
            const price = obj.controls.price;
            const total = obj.controls.total;
}
         */
        // form array  -tiene varios ->    form group   -tiene varios ->  form control
        // NOS suscribimos a los cambios del control/form control quantity
        quantity.valueChanges
          .pipe(
            // No emitas un valor durante 300 miliseg, hasta que se emita el último valor
            /**
             * Ejemplo 1
             * - click del usuario
             * - otro click al instante
             * - otro click al instante
             * - pasan 300 miliseg o más -> es mayor o igual a 300? -> SI -> el debunce time emite/manda el valor valueQuantity
             * 
             * Ejemplo 2
             * - click del usuario
             * - otro click al instante
             * - pasan 200 miliseg -> es mayor o igual a 300? -> NO 
             * - otro click
             * - pasan 300 miliseg o más -> es mayor o igual a 300? -> SI -> el debunce time emite/manda el valor valueQuantity
             */
            debounceTime(300) // es el tiempo para recién ejecutar el observable, si el usuario da varias veces seguidas click tomará el último valor para ejecutar
          )
          .subscribe({
            next: (valueQuantity) => {
              console.log('***CAMBIÓ QUANTITY***');
              const priceValue = price.value!; // !  : si o si tiene valor
              let totalValue = 0;

              if (valueQuantity) {
                // Genera el nuevo total
                totalValue = priceValue * valueQuantity;
              }

              // Modifica el form control total
              // total.patchValue(totalValue);  // lanza la deteccion de cambios del formulario del form array
              total.setValue(totalValue); // lanza la deteccion de cambios del formulario del form array
            },
          });
      }
    );
  }

  get productsFormArray() {
    return this.form.controls.products; // es el form array
  }

  clickDelete(index: number) {
    this.productsFormArray.removeAt(index);

    // Actualizar el origen de datos
    this.dataSource.data = this.productsFormArray.controls;
    console.log(this.productsFormArray.controls);
  }
}
