import { Routes } from '@angular/router';
import { ShowcaseProductsComponent } from './components/showcase-products/showcase-products.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fridge-menu'
  },
  {
    path: 'fridge-menu',
    pathMatch: 'full',
    component: ShowcaseProductsComponent
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent
  },
  {
    path: 'payment-status',
    pathMatch: 'full',
    component: PaymentStatusComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
];
