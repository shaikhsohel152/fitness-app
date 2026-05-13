import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  searchTextValue: string = '';

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {

    // ================= LOAD PRODUCTS =================
    this.productService.getProducts().subscribe({
      next: (data: any) => {

        console.log("MongoDB Products Response:", data);

        // ✅ FIX: API already returns array directly
        this.products = data.products[0].products || [];

        // initial display
        this.filteredProducts = [...this.products];

      },

      error: (err) => {
        console.log("Error loading products:", err);
      }
    });


    // ================= SEARCH SUBSCRIPTION =================
    this.searchService.searchText.subscribe((text: string) => {

      this.searchTextValue = text.toLowerCase().trim();
      this.applyFilter();

    });

  }

  // ================= FILTER LOGIC =================
  applyFilter(): void {

    if (!this.searchTextValue) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product => {

      return (
        product?.brand?.toLowerCase().includes(this.searchTextValue) ||
        product?.category?.toLowerCase().includes(this.searchTextValue) ||
        product?.description?.toLowerCase().includes(this.searchTextValue) ||
        product?.price?.toString().includes(this.searchTextValue)
      );

    });

  }

}