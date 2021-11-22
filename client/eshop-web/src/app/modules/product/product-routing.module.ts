import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'cart',
    component: CartProductsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  exports: [RouterModule, TranslateModule]
})
export class ProductRoutingModule { }
