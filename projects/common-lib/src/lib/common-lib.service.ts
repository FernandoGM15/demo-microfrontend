import { Injectable } from '@angular/core';
import { ICommonProduct } from './models/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonLibService {

  /**List of products */
  private _products: ICommonProduct[] = [];

  /**Channel source as a behavior subject */
  private _channelSource = new BehaviorSubject<number>(0);

  /**Channel payment as observable*/
  channelPayment$ = this._channelSource.asObservable();

  /** Function that store the products into localStorage */
  sendData(product: ICommonProduct) {
    this._products.push(product);
    localStorage.setItem('products', JSON.stringify(this._products));
    this._channelSource.next(this._products.length);
  }
}
