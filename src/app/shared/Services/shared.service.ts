import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  //shared service for addToCart
  cartProducts: any[] = [];



  //Refactored addToCart
  addToCart(product: any) {
    if (!this.isLocalStorageAvailable) {
      return;
    }
    let cartProducts = (this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]'));
    let existingProductIndex = cartProducts.findIndex((item: any) => item.product.id === product.product.id);
    if (existingProductIndex === -1) {
      cartProducts.push(product);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      alert('Product added to cart');
    } else {
      cartProducts[existingProductIndex].quantity = product.quantity;
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }



  /*addToCart(product: any) {
   if (this.isLocalStorageAvailable) {
     this.cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
     if (this.cartProducts.find((item: any) => item.product.id === product.product.id && item.quantity === product.quantity)) {
       alert("Product already in cart");
     }else if(this.cartProducts.find((item: any) => item.product.id === product.product.id)){
       let index = this.cartProducts.findIndex((item: any) => item.product.id === product.product.id);
       this.cartProducts[index].quantity = product.quantity;
       localStorage.setItem("cart", JSON.stringify(this.cartProducts));
       alert("Product added to cart");
     }
     else {
       this.cartProducts.push(product);
       localStorage.setItem("cart", JSON.stringify(this.cartProducts));
       alert("Product added to cart");
     }
   }
   console.log(product);
   }*/
}
