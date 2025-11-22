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

  getProduct(id: number): Observable<Product> {
    const product = this.localProducts.find(p => p.id === id);
    return of(product);
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

    deleteProduct(id: number): Observable<any> {
    const index = this.localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.localProducts.splice(index, 1);
      return of({ success: true});
    } else {
      return of({ success: false });
    }
    }
}