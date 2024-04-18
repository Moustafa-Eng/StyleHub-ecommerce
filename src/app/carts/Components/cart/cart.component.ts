import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../shared/Services/shared.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SpinnerComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private sharedService: SharedService) { }

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  loading = false;
  total = 0;

  cartProducts:any[] = [];

  // check everywhere you use loaclStorage

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
}
