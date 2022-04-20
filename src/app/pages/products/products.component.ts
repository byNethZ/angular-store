import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];

  constructor(
    private _productService : ProductsService,
    private _shoppingCartService : ShoppingCartService
  ) { }

  ngOnInit(): void {
    this._productService.getProducts()
    .pipe(
      tap( (products : Product[]) => this.products = products )
    )
    .subscribe();
  }

  addToCart(product: Product) : void{
    this._shoppingCartService.updateCart(product);
  }

}
