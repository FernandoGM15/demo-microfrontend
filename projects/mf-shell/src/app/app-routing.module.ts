import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('mfShopping/ProductsModule').then(m => m.ProductsModule)
  },
  {
    path: 'payment',
    loadComponent: () => import('mfPayment/PaymentComponent').then(m => m.PaymentComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
