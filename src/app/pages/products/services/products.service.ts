import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  getProducts() : Observable<Product[]>{
    return this._http.get<Product[]>(`${this.apiUrl}/products`);
  }

  updateStock( productId : number, stock: number ) : Observable<any>{
    const body = { "stock" : stock };
    return this._http.patch<any>(`${this.apiUrl}/products/${productId}`, body)
  }

}
