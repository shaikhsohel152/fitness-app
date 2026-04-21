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

  searchTextValue = '';

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (data:any) => {

        console.log("MongoDB Products:", data);

        // ✅ FIX → nested products array
        this.products = data[0]?.products || [];

        this.filteredProducts = this.products;

      },

      error: (err) => {
        console.log("Error loading products", err);
      }
    });


    this.searchService.searchText.subscribe(text => {

      this.searchTextValue = text.toLowerCase().trim();

      this.applyFilter();

    });

  }


  applyFilter() {

    if (!this.searchTextValue) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product =>

      product?.brand?.toLowerCase().includes(this.searchTextValue) ||

      product?.category?.toLowerCase().includes(this.searchTextValue) ||

      product?.description?.toLowerCase().includes(this.searchTextValue) ||

      product?.price?.toString().includes(this.searchTextValue)

    );

  }

}