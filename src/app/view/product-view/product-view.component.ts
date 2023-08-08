import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  @Input() product: any;
  @Output() productSelect = new EventEmitter<string>();
  constructor() {}

  openProductInfo(name: any) {
    this.productSelect.emit(name);
  }
}
