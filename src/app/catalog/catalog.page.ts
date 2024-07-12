import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService,private router: Router) {
    
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.error('Error cargando los productos', error);
    }
  }

  async addToCart(productId: string, quantity: number) {
    try {
      await this.cartService.addToCart(productId, quantity);
    } catch (error) {
      console.error('Error agregando al carro', error);
    }
  }

  goToCarrito() {
    this.router.navigate(['/cart']);
  }
}
