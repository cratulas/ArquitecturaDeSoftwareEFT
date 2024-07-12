import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  rutUsuario: string = '';
  nombreUsuario: string = '';
  direccionUsuario: string = '';
  telefonoUsuario: string = '';
  idComuna: string = '';
  comunas: any[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadComunas();
  }

  async loadComunas() {
    try {
      this.comunas = await this.dataService.getComunas();
    } catch (error) {
      console.error('Error loading comunas', error);
    }
  }

  async register() {
    if (this.email && this.password && this.rutUsuario && this.nombreUsuario && this.direccionUsuario && this.telefonoUsuario && this.idComuna) {
      try {
        await this.authService.register(
          this.email,
          this.password,
          this.rutUsuario,
          this.nombreUsuario,
          this.direccionUsuario,
          this.telefonoUsuario,
          this.idComuna
        );
        this.router.navigateByUrl('/login');
      } catch (error) {
        this.showAlert('Error', 'No se pudo registrar el usuario. Por favor, intente nuevamente.');
        console.error('Error registering', error);
      }
    } else {
      this.showAlert('Error', 'Por favor, complete todos los campos.');
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

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
