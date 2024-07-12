import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.authSubscription = user(this.auth).subscribe(async (user) => {
      if (user) {
        this.isAuthenticated = true;
        const userData = await this.authService.getUserData(user.uid);
        this.isAdmin = userData?.['isAdmin'] || false;
      } else {
        this.isAuthenticated = false;
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
