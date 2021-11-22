import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly http: HttpClient
  ){}

  createOrder(order: any) {
    return this.http.post(`${environment.orderapi}`, order);
  }
}
