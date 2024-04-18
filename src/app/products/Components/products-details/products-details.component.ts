import { Component, NgModule } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/Services/shared.service';


@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductComponent,
    SpinnerComponent
  ],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {

  constructor(private activeRoute: ActivatedRoute, private service: ProductsService, private sharedService: SharedService) {}
  product: any;
  quantity : number = 1;
  loading: boolean = false;
  ngOnInit() : void {
    this.loading = true
    let id = this.activeRoute.snapshot.params['id'];
    this.service.getSingleProduct(id).subscribe((data: any) => {
      this.product = data
      this.loading = false
      console.log(this.quantity)

    })

  }


  increaseQuantity() {
    this.quantity++;
    // check if product is added to cart, then call addToCartService
    if(localStorage.getItem('cart') || null && this.sharedService.cartProducts.find((item: any) => item.product.id === this.product.id)) {
      this.sharedService.addToCart({product:this.product, quantity: this.quantity});
  }
}

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    if(localStorage.getItem('cart') || null && this.sharedService.cartProducts.find((item: any) => item.product.id === this.product.id)) {
      this.sharedService.addToCart({product:this.product, quantity: this.quantity});
  }
  }

  addToCart() {
    this.sharedService.addToCart({product:this.product, quantity: this.quantity});
  }

}
