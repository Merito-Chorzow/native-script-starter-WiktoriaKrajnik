import { Observable, of, map, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

export interface AddProductResult {
  success: boolean
  message: string
  product: Product
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private localProducts: Product[] = [];
  private nextId = 1;

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return of([...this.localProducts]);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.localProducts.find(p => p.id === id);
    return of(product);
  }

  addProduct(product: any): Observable<AddProductResult> {
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

    const payload = {
      title: newProduct.name,
      body: newProduct.body,
      userId: newProduct.userId
    };

    return this.http.post<any>(this.API_URL, payload).pipe(
       tap(response => {
        console.log('API addProduct response:', response)
      }),
      map(() => {
        return {
          success: true,
          message: 'Added successfully',
          product: newProduct,
        } as AddProductResult
      }),
      catchError(err => {
        console.error('API addProduct error:', err)
        // W razie błędu API też zwracamy sukces lokalny, ale z innym komunikatem
        return of({
          success: false,
          message: 'Added locally (API error)',
          product: newProduct,
        } as AddProductResult)
      })
    );

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

  updateProduct(product: Product): Observable<Product> {
    const index = this.localProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.localProducts[index] = product;
      console.log('updateProduct - zaktualizowano produkt:', product);
      return of(product);
    }
    console.log('updateProduct - nie znaleziono produktu ID:', product.id);
    return of(product);
  }
}