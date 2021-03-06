import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

import { ApiProcessingService } from './api-processing.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class DataStoreService {

  productData: any = [];
  cartData: any = [];
  orderedProductList: any = []
  dynamicProductData = new BehaviorSubject<any>(this.productData); 
  dynamicCartData = new BehaviorSubject<any>(this.cartData);  
  constructor(public accessApi: ApiProcessingService, public accessToast: ToastService, public router: Router) { 
    this.getProducts();
  }


  getProducts(){
    this.productData = [];
    this.accessApi.processGetRequest('Product').subscribe(
      responseData => {
        Object.values(responseData).map(
          (individualProduct) => {
            (this.validateProductName(individualProduct.productName)) && this.productData.push(individualProduct);
          }
        )
      },
      error => {
        this.accessToast.triggerToast('Probably your offline!', 20);
      }
    );
    this.dynamicProductData.next(this.productData);
  }

  addProduct(newProduct: any){
    if(newProduct.availableQuantity <= 0){
      this.accessToast.triggerToast('Specify Valid Quantity',4);
      return;
    }
    if(!this.validateProductName(newProduct.productName)){
      this.accessToast.triggerToast('Kindly enter a valid name',4);
      return;
    }
    console.log(newProduct)
    this.accessApi.processPostRequest('Product', newProduct).subscribe(
      responseData => { 
        this.getProducts();
        this.accessToast.triggerToast('Product Added Successfully!',4); 
        this.router.navigate(['']);
      },
      error => { 
        this.accessToast.triggerToast('Something went wrong! Unable to add product',4) 
      }
    );
  }

  addProductToCart(specificProduct: any){
    if(specificProduct.purchasedQuantity <= 0){
      this.accessToast.triggerToast('Specify Valid Quantity',4);
      return;
    }
    for(let i = 0; i < this.productData.length; i++){
      if(this.productData[i].productId == specificProduct.productId){
        if(this.productData[i].availableQuantity < specificProduct.purchasedQuantity){
          this.accessToast.triggerToast('Your purchase quantity exceeds the available quantity',6);
          return;
        }
        this.productData[i].availableQuantity -= specificProduct.purchasedQuantity;
        this.accessToast.triggerToast('Product added to Cart',4);
        break;
      }
    }
    if(this.cartData.filter((product:any)=>product.productId == specificProduct.productId).length>0){
      for(let i = 0; i < this.cartData.length; i++){
        if(this.cartData[i].productId == specificProduct.productId){
          this.cartData[i].purchasedQuantity += specificProduct.purchasedQuantity;
          break;
        }
      }
    }
    else{
      this.cartData.push(specificProduct);
    }
    this.dynamicProductData.next(this.productData);
    this.dynamicCartData.next(this.cartData);
  }

  removeCartProduct(product: any){
    for(let i = 0; i < this.productData.length; i++){
      if(this.productData[i].productId == product.productId){
        this.productData[i].availableQuantity += product.purchasedQuantity;
        break;
      }
    }
    let updatedCartData = this.cartData.filter((cartProduct: any) => cartProduct.productId != product.productId);
    this.cartData = [ ...updatedCartData ]
    this.dynamicProductData.next(this.productData);
    this.dynamicCartData.next(this.cartData);
    this.accessToast.triggerToast('Product removed from Cart', 5);
  }

  checkoutProductsOrder(purchaseCartProducts: any){
    if(purchaseCartProducts.length <= 0){
      this.accessToast.triggerToast('Cannot place empty Cart, kindly add products!', 4);
      return;
    }
    purchaseCartProducts.map((purchaseProduct: any) => {
      let orderStatusFlag = true;
      purchaseProduct.quantity = purchaseProduct.purchasedQuantity;
      this.accessApi.processPostRequest('OrderProducts', purchaseProduct).subscribe(
        responseData => {
          if(responseData){
            purchaseProduct.orderStatus = true;
          }
        },
        error => {
          purchaseProduct.orderStatus = false;
          this.accessToast.triggerToast('Some products that you ordered are currently unavailable!',4)
        }
      );
      this.orderedProductList.push(purchaseProduct);
    });
    this.cartData=[];
    this.dynamicCartData.next(this.cartData);
    this.router.navigate(['viewCheckOut']);
  }


  validateProductName(productName: String){
    return (productName != null && productName.replace(/\s/g, '').length > 0)? true : false;
  }

}
