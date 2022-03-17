import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { ProductsDisplayComponent } from './products-display/products-display.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {path: '', component: ProductsDisplayComponent},
  {path: 'addProduct', component: AddNewProductComponent},
  {path: 'viewCart', component: CartDisplayComponent},
  {path: 'viewCheckOut', component: ViewOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
