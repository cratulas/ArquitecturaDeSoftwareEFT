import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  user: any = {};
  comunas: any[] = [];

  constructor(private authService: AuthService, private auth: Auth, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.loadUserData();
    this.loadComunas();
  }

  async loadUserData() {
    const user = this.auth.currentUser;
    if (user) {
      this.user = await this.authService.getUserData(user.uid);
    }
  }

  async loadComunas() {
    try {
      this.comunas = await this.dataService.getComunas();
    } catch (error) {
      console.error('Error loading comunas', error);
    }
  }

  async updateUser() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await this.authService.updateUserData(user.uid, this.user);
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      console.error('Error updating user', error);
    }
  }
}
