import { Component, importProvidersFrom, inject } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/Components/spinner/spinner.component';
import { SelectComponent } from '../../../shared/Components/select/select.component';
import { ProductComponent } from '../product/product.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SpinnerComponent,
    SelectComponent,
    ProductComponent
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})


export class AllProductsComponent {

  constructor(private service: ProductsService) {}
  loading:boolean = false;
  products: any [] = [];
  categories: any [] = [];
  title = "Select Category";


  ngOnInit() : void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((data: any) => {
      this.products = data
      this.loading = false
    });
  }
getCategories() {
  this.loading = true
  this.service.getCategories().subscribe((data: any) => {
    this.categories = data
    this.loading = false
  });
}
  filterCategory(event:any) {
      let value = event.target.value;
      (value === "all") ? this.getProducts() : this.getProductsByCategory(value);


}

getProductsByCategory(category: string) {
  this.loading = true;
  this.service.getProductsByCategory(category).subscribe((data: any) => {
    this.products = data
    this.loading = false
  });
}
}
