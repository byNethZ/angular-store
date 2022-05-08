import { Component } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
    selector: 'app-cart',
    template: `
     <ng-container *ngIf="{ total : total$ | async, quantity : quantity$ | async } as dataCart" >
        <ng-container *ngIf="dataCart.total" >
        <mat-icon>add_shopping_cart</mat-icon>
        {{ dataCart.total | currency }}
        ({{ dataCart.quantity }})
        </ng-container>
     </ng-container>
    `
})
export class CartComponent{
    quantity$ = this._shoppingCartService.quantityAction$;
    total$ = this._shoppingCartService.totalAction$;
    cart$ = this._shoppingCartService.cartAction$;
  
    constructor(
      private _shoppingCartService: ShoppingCartService
    ) { }
}