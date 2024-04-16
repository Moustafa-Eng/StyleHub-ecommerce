import { Component, NgModule } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private activeRoute: ActivatedRoute, private service: ProductsService) {}
  quantity : number = 1
  product: any;
  loading: boolean = false;
  ngOnInit() : void {
    this.loading = true
    let id = this.activeRoute.snapshot.params['id'];
    this.service.getSingleProduct(id).subscribe((data: any) => {
      this.product = data
      this.loading = false
    })

  }

}
