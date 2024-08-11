import { Routes } from '@angular/router';
import { ShowcaseProductsComponent } from './components/showcase-products/showcase-products.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';

export const routes: Routes = [
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
  {
    path: 'order/:id',
    pathMatch: 'full',
    component: PaymentStatusComponent
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
];
