import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfiguratioService } from '@app/core/services/config.service';
import { OrderService } from '@app/core/services/order.service';
import { ProductService } from '@app/core/services/product.service';
import User from '../../../core/models/billing';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [ConfiguratioService]
})
export class CheckoutComponent implements OnInit {
  billing: User = new User();
  products: any[] = [];
  paymentMethod: string[] = [];
  private cart: any;

  constructor(
    private readonly configurarion: ConfiguratioService,
    private readonly productApi: ProductService,
    private readonly orderApi: OrderService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.paymentMethod = [
      'Tarjeta de crédito',
      'Transferencia bancaria',
      'Efectivo'
    ];
    this.getProducts();
  }

  getProducts() {
    this.cart = this.configurarion.getLocalCart();
    this.products = this.cart.items;
  }

  checkout(form: NgForm) {
    const order = {
      id: 0,
      status: '',
      invoice: '',
      total: this.total(),
      comments: '',
      idbuyersession: this.configurarion.getBuyerId(),
      buyer: form.value,
      items: this.products
    };
    this.orderApi.createOrder(order).subscribe(() => {
      const buyerid = this.configurarion.getBuyerId();
      this.productApi.removeSessionCart(buyerid).subscribe(() => {
        this.configurarion.removeSession();
        this.configurarion.generateSession(form.value.email);
        this.success();
      });
    });
  }

  success() {
    this.router.navigate(['order/success']);
  }

  total() {
    if (this.products.length) {
      return this.products.map(
        product => product.price * product.quantity
      ).reduce((acc, product) => product + acc);
    } else {
      return 0;
    }
  }
}
