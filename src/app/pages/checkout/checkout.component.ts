import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: 'NethZ',
    store: '',
    shippingAddress: '',
    city: '',
  }

  isDelivery : boolean = true;

  cart : Product [] = [];

  stores : Store[] = []

  constructor(
    private _dataService: DataService,
    private _shoppingCartService : ShoppingCartService,
    private _router: Router,
    private _productService: ProductsService
  ) {
    this.checkIfCartEmpty();
   }

  ngOnInit(): void {
    this.getStore();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value : boolean) : void {
    this.isDelivery =  value;
  }

  onSubmit({value : formData } : NgForm) : void {
    console.log(formData);
    const data : Order = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery
    }
    this._dataService.saveOrders(data).pipe(
      tap((res) => console.log('Order =>', res) ),
      switchMap( ( {id:orderId} ) => {
        const details = this.prepareDetails();
        return this._dataService.saveDetailsOrder({details, orderId});
      } ),
      tap( () => this._router.navigate(['/checkout/thanks']) ),
      delay(2000),
      tap( () => this._shoppingCartService.resetCart() )
    ).subscribe();
  }

  private getStore(): void{
    this._dataService.getStores().pipe(
      tap((stores : Store[]) => this.stores = stores)
    ).subscribe()
  }

  private getCurrentDate():string{
    return new Date().toLocaleDateString()
  }

  private prepareDetails() : Details[] {
    const details : Details[] = [];
    this.cart.forEach( (product : Product) => {
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = (stock - quantity);

      this._productService.updateStock(productId, updateStock).pipe(
        tap( res => details.push({productId, productName, quantity}) )
      ).subscribe()

      details.push({productId, productName, quantity});
    } )

    return details;
  }

  private getDataCart() : void {
    this._shoppingCartService.cartAction$.pipe(
      tap( (products : Product[]) => this.cart = products )
    ).subscribe()
  }

  private checkIfCartEmpty() : void {
    this._shoppingCartService.cartAction$
    .pipe(
      tap( (products : Product[] ) => {
        if(Array.isArray(products) && !products.length ) {
          this._router.navigate(['/products'])
        }
      }  )
    )
    .subscribe()
  }

}
