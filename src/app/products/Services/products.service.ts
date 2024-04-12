import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient : HttpClient) { }

  getAllProducts() {
    return this.httpClient.get('https://fakestoreapi.com/products');
  }

  getCategories() {
    return this.httpClient.get('https://fakestoreapi.com/products/categories');
  }

  getProductsByCategory(category: string) {
    return this.httpClient.get(`https://fakestoreapi.com/products/category/${category}`);
  }
}
