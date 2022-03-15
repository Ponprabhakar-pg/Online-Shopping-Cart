import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.scss']
})
export class CartDisplayComponent implements OnInit {

  products: any =[];
  cartProducts: any= [];
  breakpoint: any;

  constructor(public accessDataStoreService: DataStoreService) { 
    this.accessDataStoreService.dynamicProductData.subscribe((dynamicProductData: any) => {
      this.products = dynamicProductData;
    });
    this.accessDataStoreService.dynamicCartData.subscribe((dynamicCartData: any) => {
      this.cartProducts = dynamicCartData;
    });
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth >= 1055 ? 3 : window.innerWidth >= 710 ? 2 : 1;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth >= 1055 ? 3 : window.innerWidth >= 710 ? 2 : 1;
  }


  removeProductFromCart(product: any){
    this.accessDataStoreService.removeCartProduct(product);
  }

  orderProducts(){
    this.accessDataStoreService.checkoutProductsOrder(this.cartProducts);
  }

}

