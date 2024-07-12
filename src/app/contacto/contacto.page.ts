import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {

  constructor(private alertController: AlertController) {}

  async submitForm(form: NgForm) {
    if (form.valid) {
      const alert = await this.alertController.create({
        header: 'Formulario Enviado',
        message: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
        buttons: ['OK']
      });
      await alert.present();
      form.reset();
    }
  }
}
