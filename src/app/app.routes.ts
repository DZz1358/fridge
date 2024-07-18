import { ShowcaseProductsComponent } from './components/showcase-products/showcase-products.component';
import { CartComponent } from './components/cart/cart.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShowcaseProductsComponent
  },
  {
    path: 'fridge-menu/:id',
    pathMatch: 'full',
    component: ShowcaseProductsComponent
  },
  {
    path: 'fridge-menu/:id/cart',
    pathMatch: 'full',
    component: CartComponent
  },
];
