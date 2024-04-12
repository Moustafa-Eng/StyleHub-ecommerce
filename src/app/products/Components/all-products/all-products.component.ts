import { Component, importProvidersFrom, inject } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})


export class AllProductsComponent {

  constructor(private service: ProductsService) {}
  products: any [] = [];
  categories: any [] = [];


  ngOnInit() : void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.service.getAllProducts().subscribe((data: any) => {
      this.products = data
    });
    console.log(this.products)
  }
getCategories() {
  this.service.getCategories().subscribe((data: any) => {
    this.categories = data
  });
}
  filterCategory(event:any) {
    if (event.target.value === 'products') {
      this.getProducts();
    }else{
      let value = event.target.value;
      this.getProductsByCategory(value);
    }

}

getProductsByCategory(category: string) {
  this.service.getProductsByCategory(category).subscribe((data: any) => {
    this.products = data
  });
}
}

