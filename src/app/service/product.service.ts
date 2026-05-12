import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  id?: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  bought: number;   // ✅ FIXED TYPO
  imgsrc: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ✅ Backend URL
  private url = 'https://angular-fitness-database.onrender.com/products';

  constructor(private http: HttpClient) {}

  // ================= GET ALL PRODUCTS =================
  getProducts(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  // ================= GET SINGLE PRODUCT =================
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}