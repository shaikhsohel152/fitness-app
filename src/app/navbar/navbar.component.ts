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

    // ❌ REMOVE THIS (causes logout bug)
    // sessionStorage logic hata do

    // 🛒 Cart count
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce(
        (count, item) => count + item.quantity,
        0
      );
    });

    this.loadUser();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUser();
      });
  }

  // 👤 Load user safely
  loadUser(): void {

    const user = localStorage.getItem('currentUser');

    if (user) {
      const parsedUser = JSON.parse(user);

      this.isLoggedIn = true;

      // ✅ ONLY name (no fallback confusion)
      this.userName = parsedUser.name;

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

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loadUser();
    this.router.navigate(['/home']);
  }

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