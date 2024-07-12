import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private auth: Auth, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      const userData = await this.authService.getUserData(user.uid);
      if (userData?.['isAdmin']) {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
