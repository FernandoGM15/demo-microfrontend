import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

const routes: Routes = [{ path: '', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductCardComponent,
    RouterModule.forChild(routes),
  ]
})
export class ProductsModule { }
