import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  product: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log("Route ID:", id);

    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (data: any) => {

        console.log("Mongo Data:", data);

        // 🔥 FIX: correct flattening (ONLY use actual array)
        const productsArray = Array.isArray(data)
          ? data
          : (data.products?.[0]?.products || []);

        console.log("All Products:", productsArray);

        this.product = productsArray.find(
          (p: any) => String(p.id) === String(id)
        );

        console.log("Selected Product:", this.product);

        this.loading = false;

      },

      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
  }
}