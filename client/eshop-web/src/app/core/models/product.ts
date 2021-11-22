export class Product {
  id: number;
  name!: string;
  price!: number;
  imageurl!: string;
  quantity: number;

  constructor() {
    this.id = 0;
    this.quantity = 1;
  }
}
