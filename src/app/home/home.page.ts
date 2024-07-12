import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription | undefined;
  welcomeMessage: string = '';

  constructor(private authService: AuthService, private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.authSubscription = user(this.auth).subscribe(async (user) => {
      if (user) {
        this.isAuthenticated = true;
        const userData = await this.authService.getUserData(user.uid);
        this.isAdmin = userData?.['isAdmin'] || false;
        this.welcomeMessage = this.isAdmin ? 'Admin' : 'Usuario';
      } else {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.welcomeMessage = 'Visita';
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
