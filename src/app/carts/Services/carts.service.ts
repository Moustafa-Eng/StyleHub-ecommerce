import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  // create cart to api
  addNewCart(cartModel:any){
    return this.http.post('https://fakestoreapi.com/carts',cartModel);
  }
}
