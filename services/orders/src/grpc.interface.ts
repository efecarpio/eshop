import { Observable } from 'rxjs';

export interface BasketService {
  RemoveBasketAfterOrder(id: BasketById): Observable<any>;
}
interface BasketById {
  id: string;
}