import { ConfiguratioService } from './../../../core/services/config.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfiguratioService]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cart: any;
  private isLoading = true;

  constructor(
    private readonly configuration: ConfiguratioService,
    private readonly api: ProductService
  ) { }

  ngOnInit(): void {
    // this.configuration.removeSession();
    this.configuration.generateSession();
    this.cart = this.configuration.getLocalCart();
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.api.getProducts().subscribe((response: any) => {
      this.products = response.data.data;
    });
  }

  addToCart(product: any) {
    const item = {
      id: 0,
      idproduct: product.id,
      name: product.name,
      quantity: 1,
      price: product.price
    }
    this.cart.items.push(item);
    this.configuration.setLocalCart(this.cart);
    console.log(this.cart);
  }
}
