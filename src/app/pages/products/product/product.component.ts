import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title>
          {{ product.name }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        {{ product.description }}
      </mat-card-content>
      <mat-card-actions>
        <button mat-flat-button color="primary" (click)="onClick()" [disabled]="product.stock === 0" >
          Buy {{ product.price | currency }}
          <mat-icon>add_shopping_cart</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./product.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();

  onClick(): void {
    this.addToCartClick.emit(this.product);
  }
}
