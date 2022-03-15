import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.scss']
})


export class ProductsDisplayComponent implements OnInit {

  productsBackup: any = [];
  products: any = [];
  cartProducts: any = [];
  displayType: String = "";
  breakpoint: any;

  constructor(public accessDataStoreService: DataStoreService) { 
    this.accessDataStoreService.dynamicProductData.subscribe((dynamicProductData: any)=>{
      this.productsBackup = dynamicProductData;
    });
    this.accessDataStoreService.dynamicCartData.subscribe((dynamicCartData: any)=>{
      this.cartProducts = dynamicCartData;
    });
    this.displayFilter('all');
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth >= 1055 ? 3 : window.innerWidth >= 710 ? 2 : 1;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth >= 1055 ? 3 : window.innerWidth >= 710 ? 2 : 1;
  }

  displayFilter(filterType: String){
    switch(filterType){
      case 'all':
        this.displayType="All Products"
        this.products = this.productsBackup;
        break;
      case 'available':
        this.displayType="Available Products"
        this.products = this.productsBackup.filter((product: {availableQuantity: Number}) => product.availableQuantity != 0);
        break;
      case 'unavailable':
        this.displayType="Unavailable Products"
        this.products = this.productsBackup.filter((product: {availableQuantity: Number}) => product.availableQuantity == 0);
        break;
    }
  }

  addProductToCart(productId: String, productQuantity: String){
    let specificProduct = { ...this.productsBackup.filter((product: any) => product.productId == productId)[0] };
    delete specificProduct.availableQuantity;
    specificProduct.purchasedQuantity = Number(productQuantity);
    this.accessDataStoreService.addProduct(specificProduct);
  }

}
