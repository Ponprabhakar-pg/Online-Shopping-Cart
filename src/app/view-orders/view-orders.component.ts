import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  products: any = [];
  orderedProducts: any = [];

  constructor(public accessDataStoreService: DataStoreService) { 
    this.accessDataStoreService.dynamicProductData.subscribe((dynamicProductData: any)=>{
      this.products=dynamicProductData;
    });

    this.orderedProducts=this.accessDataStoreService.orderedProductList;
  }

  ngOnInit(): void {
  }


  checkOut(){
    this.accessDataStoreService.orderedProductList=[];
  }
}
