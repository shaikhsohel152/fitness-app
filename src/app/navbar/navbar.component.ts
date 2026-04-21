import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../service/cart.service';
import { SearchService } from '../service/search.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;

  isLoggedIn = false;
  userName: string | null = null;

  showSearch = false;
  searchText = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {

    // ✅ ONLY ng serve restart par user clear hoga
    if (!sessionStorage.getItem('ngServeStarted')) {
      localStorage.removeItem('currentUser');
      sessionStorage.setItem('ngServeStarted', 'true');
    }

    // 🛒 Cart Count
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce(
        (count, item) => count + item.quantity,
        0
      );
    });

    // 🔐 Initial load
    this.loadUser();

    // 🔁 Route change par navbar update
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUser();
      });
  }

  // 👤 Load user from localStorage
  loadUser(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.isLoggedIn = true;
      this.userName = parsedUser.name || parsedUser.username;
    } else {
      this.isLoggedIn = false;
      this.userName = null;
    }
  }

  openProfile(): void {
    this.isLoggedIn
      ? this.router.navigate(['/porfolio'])
      : this.router.navigate(['/profile']);
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.loadUser();
    this.router.navigate(['/home']);
  }

  // 🔍 Search
  openSearch(): void {
    this.showSearch = true;
  }

  closeSearch(): void {
    if (!this.searchText.trim()) {
      this.showSearch = false;
    }
  }

  onSearch(): void {
    this.searchService.searchText.next(this.searchText);
    this.router.navigate(['/product']);
  }
}
