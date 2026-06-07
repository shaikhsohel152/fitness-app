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
  userName = '';

  showSearch = false;
  searchText = '';
  menuOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {

    // CART COUNT
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });

    this.loadUser();

    // route change pe refresh user
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadUser());

    // tab refresh / storage sync (important fix)
    window.addEventListener('storage', () => this.loadUser());
  }

 loadUser(): void {
  const data = localStorage.getItem('currentUser');

  if (!data) {
    this.isLoggedIn = false;
    this.userName = '';
    return;
  }

  try {
    const user = JSON.parse(data);

    this.isLoggedIn = true;

    // 🔥 SAFE NAME EXTRACTION (FIX)
    this.userName =
      user?.name ||
      user?.userName ||
      user?.fullName ||
      user?.profile?.name ||
      'User';

    console.log("NAVBAR USER:", user);

  } catch (e) {
    console.log('Invalid user data');
    this.isLoggedIn = false;
    this.userName = '';
  }
}

  openProfile(): void {
    this.router.navigate([this.isLoggedIn ? '/profile' : '/login']);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/home']);
  }

  onSearch(): void {
    this.searchService.searchText.next(this.searchText);
    this.router.navigate(['/product']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }
}