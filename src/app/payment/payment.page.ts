import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadPayPalScript();
  }

  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATIF-peVyo_cJZ8ygqsDKF_hTC3WXN_WDTmqKsoxodSTW0lRo2vm_DDd7kCToyYxJpcNkFnS8O9UoTC-';
    script.onload = () => this.renderPayPalButton();
    document.body.appendChild(script);
  }

  renderPayPalButton() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01' // Monto de la transacción
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          // Aquí puedes redirigir al usuario o actualizar el estado de la compra
        });
      },
      onError: (err: any) => {
        console.error('An error occurred during the transaction', err);
      }
    }).render('#paypal-button-container');
  }
}
