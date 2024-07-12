import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: any[] = [];
  products: any[] = [];
  total: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartObservable().subscribe(cart => {
      if (cart && cart.items) {
        this.cartItems = cart.items;
        this.loadProductDetails();
      }
    });
    this.loadCart();
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  async loadCart() {
    try {
      await this.cartService.getCart();
    } catch (error) {
      console.error('Error loading cart', error);
    }
  }

  async loadProductDetails() {
    try {
      const allProducts = await this.productService.getProducts();
      this.products = allProducts.filter(product => this.cartItems.some(item => item.productId === product.id));
      this.calculateTotal();
    } catch (error) {
      console.error('Error loading product details', error);
    }
  }

  getProductById(productId: string) {
    return this.products.find(product => product.id === productId);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      const product = this.getProductById(item.productId);
      return acc + (product ? product.precio * item.quantity : 0);
    }, 0);
  }

  async clearCart() {
    try {
      await this.cartService.clearCart();
      this.cartItems = [];
      this.products = [];
      this.total = 0;
    } catch (error) {
      console.error('Error clearing cart', error);
    }
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }

  navigateToCatalog() {
    this.router.navigate(['/catalog']);
  }
}
