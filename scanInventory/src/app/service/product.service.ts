import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  code: string;
  body: string;
  userId: number;
  image?: string;
  available?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Lokalna lista produktów - symulujemy prawdziwą bazę danych
  private localProducts: Product[] = [];
  private nextId = 1;

  getProducts(): Observable<Product[]> {
    return of([...this.localProducts]);
  }

  addProduct(product: any): Observable<Product> {
    const newProduct: Product = {
      id: this.nextId++,
      name: product.name,
      code: product.code,
      body: product.description,
      userId: product.userId,
      image: product.image ? product.image : undefined,
      available: true,
    };
    this.localProducts.push(newProduct);
    return of(newProduct);
  }
}