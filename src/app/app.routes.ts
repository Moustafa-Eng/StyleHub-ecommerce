import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/Components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/Components/products-details/products-details.component';
import { CartComponent } from './carts/Components/cart/cart.component';
import { LoginComponent } from './auth/components/login/login.component';
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
    path: 'details/:id',
    component: ProductsDetailsComponent
  },
  {
    path: 'auth/login',
    component:  LoginComponent
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }

];
