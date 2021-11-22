import { ConfiguratioService } from './../../../core/services/config.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
  providers: [ConfiguratioService]
})
export class CartProductsComponent implements OnInit {
  products: any[] = [];
  private cart: any;

  constructor(
    private readonly configurarion: ConfiguratioService,
    private readonly productApi: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cart = this.configurarion.getLocalCart();
    if (this.cart.id === 0) {
      this.productApi.addToCart(this.cart).subscribe((response: any) => {
        this.configurarion.setLocalCart(response);
      });
    } else {
      this.configurarion.setLocalCart(this.cart);
    }
    this.products = this.cart.items;
  }

  increamentQTY(id: number, quantity: number): void {
    const product = this.products[id];
    product.quantity += +quantity;
  }

  decrementQTY(id: number, quantity: number): void {
    const product = this.products[id];
    product.quantity -= +quantity;
  }

  removeProductFromCart(id: number, index: number) {
    this.productApi.removeItemCart(id).subscribe((response: any) => {
      this.products.splice(index,1);
      this.cart.items.splice(index,1);
      this.configurarion.setLocalCart(this.cart);
    });
  }

  updateCart(): void {
    this.cart.items = this.products;
    // this.configurarion.setLocalCart(this.cart);
    this.productApi.updateCart(this.cart).subscribe((response: any) => {
      this.configurarion.setLocalCart(response);
    });
  }

  emptyCart(): void {
    console.log('Vaciar carrito');
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
