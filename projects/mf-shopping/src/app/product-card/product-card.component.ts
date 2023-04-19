import { Component, Input } from '@angular/core';
import { IProductCard } from '../models/product-card.interface';
import { CommonModule } from '@angular/common';
import { CommonLibService } from '@common-lib';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule],
})
export class ProductCardComponent {
  @Input() product?: IProductCard;

  constructor(private _commonsLibService: CommonLibService) { }

  clickCard(): void {
    this._commonsLibService.sendData({
      name: this.product!.name,
      price: this.product!.price,
    });
  }
}
