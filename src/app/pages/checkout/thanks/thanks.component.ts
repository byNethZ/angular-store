import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  template: `
    <div class="container">
  <h1 class="title">Thank you!</h1>
  <p class="content">
    You order is on the way!
  </p>
  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis minima iure quibusdam nam expedita quia repellat voluptates deserunt veniam consequuntur.</span>
</div>

  `,
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
