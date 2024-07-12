import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonSelect } from '@ionic/angular';
import { SupplierService } from '../services/supplier.service';
import { DataService } from '../services/data.service'; // Servicio para cargar comunas

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  suppliers: any[] = [];
  comunas: any[] = [];

  @ViewChild('supplierName', { static: false }) supplierName!: IonInput;
  @ViewChild('supplierAddress', { static: false }) supplierAddress!: IonInput;
  @ViewChild('supplierPhone', { static: false }) supplierPhone!: IonInput;
  @ViewChild('supplierComuna', { static: false }) supplierComuna!: IonSelect;

  constructor(private supplierService: SupplierService, private dataService: DataService) {}

  ngOnInit() {
    this.loadSuppliers();
    this.loadComunas();
  }

  async loadSuppliers() {
    try {
      const suppliers = await this.supplierService.getSuppliers();
      this.suppliers = suppliers || [];
    } catch (error) {
      console.error('Error loading suppliers', error);
    }
  }

  async loadComunas() {
    try {
      this.comunas = await this.dataService.getComunas();
    } catch (error) {
      console.error('Error loading comunas', error);
    }
  }

  async addSupplier(nombre: string, direccion: string, telefono: string, idComuna: string) {
    try {
      await this.supplierService.addSupplier(nombre, direccion, telefono, idComuna);
      this.loadSuppliers();
    } catch (error) {
      console.error('Error adding supplier', error);
    }
  }

  handleAddSupplier() {
    const nombre = this.supplierName.value as string || '';
    const direccion = this.supplierAddress.value as string || '';
    const telefono = this.supplierPhone.value as string || '';
    const idComuna = this.supplierComuna.value as string || '';

    this.addSupplier(nombre, direccion, telefono, idComuna);
  }
}
