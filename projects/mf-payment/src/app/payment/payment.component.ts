import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICommonProduct } from '@common-lib';

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {
  products: ICommonProduct[] = [];

  ngOnInit(): void {
    const productStorage = localStorage.getItem('products');
    console.log(productStorage);
    if (productStorage) {
      this.products = JSON.parse(productStorage) as ICommonProduct[];
    }
  }
}
