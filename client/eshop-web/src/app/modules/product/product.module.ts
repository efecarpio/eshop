import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared';
import { ShellModule } from '@app/shell/shell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';

@NgModule({
  declarations: [
    ProductListComponent,
    CartProductsComponent,
    CartCalculatorComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    MaterialModule,
    SharedModule,
    ShellModule,
    FlexLayoutModule,
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
