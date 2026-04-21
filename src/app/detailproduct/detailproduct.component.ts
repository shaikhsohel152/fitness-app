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

  product: any;
  loading: boolean = true; // ✅ loading state

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    // ✅ Get ID from route
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Route ID:", id);

    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log("Mongo Data:", data);

        // Flatten all products (nested categories or direct products)
        const productsArray: any[] = [];
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (Array.isArray(item.products)) {
              productsArray.push(...item.products);
            } else if (item.id) {
              productsArray.push(item);
            }
          });
        }

        // ✅ Find product by id
        this.product = productsArray.find(p => String(p.id) === String(id));

        console.log("Selected Product:", this.product);

        this.loading = false; // ✅ stop loading
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  addToCart() {

if (!this.product) return;

this.cartService.addToCart(this.product);

}
}