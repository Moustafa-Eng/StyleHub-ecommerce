import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../shared/Services/shared.service';
import { CartsService } from '../../Services/carts.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private sharedService: SharedService, private cartService: CartsService) { }

  // check everywhere you use loaclStorage
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  loading = false;
  total = 0;
  success = false;

  cartProducts:any[] = [];


ngOnInit():void{
  this.getCartProducts();
  this.calculateTotal();
}

  //get Products from local storage
  getCartProducts() {
    this.loading = true;
    if (this.isLocalStorageAvailable) {
      if('cart' in localStorage) {
        this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      }
    }
    this.loading = false;
  }
  //Delete product from cart
  deleteProduct(product:any) {
    this.cartProducts = this.cartProducts.filter(item => item.product.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calculateTotal();
  }

  //Calculate Total
  calculateTotal() {
    let total = 0;
    this.cartProducts.forEach(item => {
      total += item.product.price * item.quantity;
    });
    this.total = total;
  }


  increaseQuantity(item: any) {
    item.quantity++;
    this.sharedService.addToCart(item);
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.sharedService.addToCart(item);
      this.calculateTotal();
    }
  }

  addCartToOrder(){

    let products = this.cartProducts.map(item => {
      return {
        productId: item.product.id,
        quantity: item.quantity
      }
    });


    let cartModel ={
      userId: 5,
      date: new Date(),
      products: products
    }

    this.cartService.addNewCart(cartModel).subscribe(res => {
      this.success = true;
    });
  }


}
