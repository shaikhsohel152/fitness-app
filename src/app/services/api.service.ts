import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
}

export interface Purchase {
  _id?: string;
  name: string;
  email:string;
  brand: string;
  price: number;
  quantity: number;
  address: string;
  date: string;
}

export interface Members {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  training: string;
}

export interface Request {
  _id?: string;
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Backend URL
 private BASE_URL = 'https://gymgearpro-api.onrender.com';

  constructor(private http: HttpClient) { }


  // ================= USER APIs =================

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: string, data: any): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/users/${id}`, data);
  }

  // ================= PURCHASE APIs =================

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.BASE_URL}/purchase`);
  }

  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.BASE_URL}/purchase`, purchase);
  }

  // ================= TRAINING APIs =================
  addMembers(members: Members): Observable<Members> {
    return this.http.post<Members>(
      `${this.BASE_URL}/training`,
      members
    );
  }

  // ================= CONTACT APIs =================

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(
      `${this.BASE_URL}/request`,
      request
    )
  }

  // ================= LOGIN API =================

  loginUser(data: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(
      `${this.BASE_URL}/api/login`,
      data
    );
  }


}