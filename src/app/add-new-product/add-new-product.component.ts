import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  products: any = [];
  cartProducts: any = [];


  constructor(public accessDataStoreService: DataStoreService) { 
    this.accessDataStoreService.dynamicProductData.subscribe((dynamicProductData: any)=>{
      this.products = dynamicProductData;
    });
    this.accessDataStoreService.dynamicCartData.subscribe((dynamicCartData: any)=>{
      this.cartProducts = dynamicCartData;
    });
  }

  ngOnInit(): void {
  }

  addNewProduct(productName: String, productQuantity: String){
    let newProduct = {
      "productName" : productName,
      "productId" : uuidv4(),
      "availableQuantity":  Number(productQuantity),
    }
    this.accessDataStoreService.addProduct(newProduct);
  }

}
