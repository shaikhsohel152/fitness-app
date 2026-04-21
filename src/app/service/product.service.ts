import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  id?: string;
  brand: string;
  description: string;
  category: string;
  price: string;
  discountPercentage: string;
  rating: string;
  bougth: string;
  imgsrc: string;
  quantity:number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ✅ Node + MongoDB Backend URL
  private url = 'https://gymgearpro-api.onrender.com/products';

  constructor(private http: HttpClient) { }

  // ✅ Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  // ✅ Get single product (Detail Page)
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

}