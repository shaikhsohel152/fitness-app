import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ================= BASE URL =================
 private BASE_URL = "http://localhost:3500";

  constructor(private http: HttpClient) {}

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

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
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

  // ================= PRODUCTS =================
  getProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/products`);
  }

  // ================= OTP LOGIN (NEW SYSTEM) =================
sendOtp(email: string): Observable<any> {
  return this.http.post(`${this.BASE_URL}/api/otp/send-otp`, {
    email
  });
}

verifyOtp(data: any): Observable<any> {
  return this.http.post(`${this.BASE_URL}/api/otp/verify-otp`, data);
}

}