import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any>(null);

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private getUserId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  async getCart() {
    const userId = this.getUserId();
    if (!userId) throw new Error('User not authenticated');

    const cartRef = doc(this.firestore, 'carritos', userId);
    const cartSnapshot = await getDoc(cartRef);

    const cartData = cartSnapshot.exists() ? cartSnapshot.data() : { userId, items: [] };
    this.cartSubject.next(cartData);
    return cartData;
  }

  async addToCart(productId: string, quantity: number) {
    const userId = this.getUserId();
    if (!userId) {
      await this.notificationService.showAlert('Por favor logeate para poder agregar productos');
      this.router.navigate(['/login']);
      return;
    }

    const cartRef = doc(this.firestore, 'carritos', userId);
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.exists() ? cartSnapshot.data() : { userId, items: [] };

    const items = cartData['items'] as any[];
    const existingItemIndex = items.findIndex((item: any) => item.productId === productId);
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += quantity;
    } else {
      items.push({ productId, quantity });
    }

    await setDoc(cartRef, cartData);
    this.cartSubject.next(cartData);
    await this.notificationService.showAlert('Producto agregado correctamente.');
  }

  async clearCart() {
    const userId = this.getUserId();
    if (!userId) throw new Error('Usuario no logeado');

    const cartRef = doc(this.firestore, 'carritos', userId);
    const emptyCartData = { userId, items: [] };
    await setDoc(cartRef, emptyCartData);
    this.cartSubject.next(emptyCartData);
  }
}
