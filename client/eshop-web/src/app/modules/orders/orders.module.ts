import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared';
import { ShellModule } from '@app/shell/shell.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SucessComponent } from './sucess/sucess.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    SucessComponent
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
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
