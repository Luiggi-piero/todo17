import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductsApiService } from './services/api/products-api.service';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { DemoInterceptor } from './interceptors/demo.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    HomePageComponent,
    HttpClientModule,
    MatCardModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    ProductsApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DemoInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
