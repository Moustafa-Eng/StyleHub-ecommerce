import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/Components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/Components/products-details/products-details.component';
import { CartComponent } from './carts/Components/cart/cart.component';
export const routes: Routes = [
  {
    path: 'products',
    component: AllProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'products-details',
    component: ProductsDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }

];
