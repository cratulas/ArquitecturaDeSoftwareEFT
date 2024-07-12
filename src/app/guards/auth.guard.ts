import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router, private notificationService: NotificationService) {}

  canActivate(): boolean {
    const user = this.auth.currentUser;
    if (user) {
      return true;
    } else {
      this.notificationService.showAlert('Incia sesión para poder comprar');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

