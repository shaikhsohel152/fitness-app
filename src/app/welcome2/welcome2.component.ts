import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome2',
  templateUrl: './welcome2.component.html',
  styleUrls: ['./welcome2.component.css']
})
export class Welcome2Component implements OnInit {

  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');

    if (!userData) {
      // ❌ agar user logged in nahi hai
      this.router.navigate(['/profile']);
      return;
    }

    const user = JSON.parse(userData);
    this.userName = user.name || '';
  }

  closePage(): void {
    // ✅ signup success ke baad profile-page
    this.router.navigate(['/porfolio']);
  }
}
