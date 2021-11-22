export default class BillingDetail {
  id: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  address1!: string;
  address2!: string;
  country!: string;
  phone!: string;
  city!: string;
  zipcode!: number;

  constructor() {
    this.id = 0;
  }
}
