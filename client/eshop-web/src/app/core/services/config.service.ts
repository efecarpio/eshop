import { Injectable } from '@angular/core';
import { CommonFunctions } from './common.service';

interface IItemLocalCart {
  id: number;
  idproduct: number;
  name: string;
  price: number;
  quantity: number;
  imageuri: string;
  idbasket: any;
}

interface ILocalCart {
  id: number;
  idbuyersession: string;
  items: IItemLocalCart[];
}

@Injectable()
export class ConfiguratioService {
  generateSession(emailDefault: string = '') {
    const sessionId = localStorage.getItem('session');
    if (CommonFunctions.isUndefinedObject(sessionId)) {
      const buyerid = CommonFunctions.uuid();
      const session = {
        idbuyersession: buyerid,
        email: emailDefault,
        cart: {
          id: 0,
          idbuyersession: buyerid,
          items: [],
        }
      };
      localStorage.setItem('session', JSON.stringify(session));
    }
  }

  removeSession() {
    localStorage.removeItem('session');
  }

  getBuyerId() {
    return this.getSession('idbuyersession');
  }

  getEmail() {
    return this.getSession('email');
  }

  getLocalCart(): ILocalCart {
    return this.getSession('cart');
  }

  getTotalItemsCart(): number{
    const cart = this.getSession('cart');
    return cart.items.length;
  }

  setLocalCart(cartUpdated: any) {
    this.setSession({ cart: cartUpdated });
  }

  setEmail(emailUpdated: string) {
    this.setSession({ email: emailUpdated });
  }

  private setSession(payload: any) {
    const session = localStorage.getItem('session') || '';
    if (!CommonFunctions.isUndefinedObject(session)){
      const sessionJSON = JSON.parse(session);
      Object.assign(sessionJSON, payload);
      localStorage.setItem('session', JSON.stringify(sessionJSON));
    }
  }

  private getSession(field: string) {
    const session = localStorage.getItem('session') || '';
    if (!CommonFunctions.isUndefinedObject(session)){
      const sessionJSON = JSON.parse(session);
      return sessionJSON[field];
    }
  }
}
