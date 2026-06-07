import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  orders: any[] = [];
  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userEmail = user.email || '';

    this.loadOrders();
  }

  /* ================= LOAD USER SPECIFIC ORDERS ================= */
  loadOrders() {

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const userKey = user.email;

  const data = localStorage.getItem(`orders_${userKey}`);

  if (data) {
    this.orders = JSON.parse(data);
  } else {
    this.orders = [];
  }
}

  /* ================= BACK ================= */
  goBack() {
    this.router.navigate(['/profile']);
  }

  /* ================= GO PRODUCTS ================= */
  goToProducts() {
    this.router.navigate(['/product']);
  }
}