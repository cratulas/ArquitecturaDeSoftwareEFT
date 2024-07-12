import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    if (this.email && this.password) {
      try {
        await this.authService.login(this.email, this.password);
        this.router.navigateByUrl('/home');
      } catch (error) {
        this.showAlert('Login Failed', 'Invalid email or password.');
      }
    } else {
      this.showAlert('Error', 'Please enter both email and password.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
