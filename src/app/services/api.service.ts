import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 🔥 IMPORTANT: MUST be your working Render backend
  private BASE_URL = "https://angular-fitness-database-1.onrender.com";

  constructor(private http: HttpClient) { }

  // ================= USERS =================
  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/users/${id}`, data);
  }

  // ================= PURCHASE =================
  getPurchases(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/purchase`);
  }

  addPurchase(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/purchase`, data);
  }

  // ================= TRAINING =================
  addMembers(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/training`, data);
  }

  // ================= REQUEST =================
  addRequest(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/request`, data);
  }

  // ================= LOGIN =================
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/login`, data);
  }
}