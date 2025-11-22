import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './product-add/product-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-add', component: AddProductComponent },
];
