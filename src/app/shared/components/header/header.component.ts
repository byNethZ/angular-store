import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <a [routerLink]="['/']">
        <span>My Application</span>
      </a>
      <span class="spacer"></span>
      <app-cart class='mouseHover' (click)="goToCheckout()" ></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _router: Router
  ){}
  ngOnInit(): void {}

  goToCheckout() : void {
    this._router.navigate(['/checkout']);
  }
}
