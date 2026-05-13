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
  bought: number;
  imgsrc: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ================= FIXED BACKEND URL =================
  private url = 'http://localhost:5000/products';

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