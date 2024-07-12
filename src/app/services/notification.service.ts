import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private alertController: AlertController) {}

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
