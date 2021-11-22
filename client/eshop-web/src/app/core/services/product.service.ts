import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly http: HttpClient
  ){}

  getProducts() {
    return this.http.get(`${environment.productapi}?page=1&name=`);
  }
  getProductById(id: number) {
    return '';
  }
  getCart(idbuyer: string){
    return this.http.get(`${environment.basketapi}/cart/${idbuyer}`);
  }
  addToCart(payload: any) {
    return this.http.post(`${environment.basketapi}`, payload);
  }
  updateCart(payload: any) {
    return this.http.put(`${environment.basketapi}`, payload);
  }
  removeItemCart(id: number){
    return this.http.delete(`${environment.basketapi}/single/item/${id}`);
  }
  removeSessionCart(id: number){
    return this.http.delete(`${environment.basketapi}/sess/${id}`);
  }
}
