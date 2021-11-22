import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutComponent } from './checkout/checkout.component';
import { SucessComponent } from './sucess/sucess.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: 'success',
    component: SucessComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  exports: [RouterModule, TranslateModule]
})
export class OrdersRoutingModule { }
