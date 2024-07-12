import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private firestore: Firestore) {}

  async addSupplier(nombre: string, direccion: string, telefono: string, idComuna: string) {
    try {
      const supplierRef = collection(this.firestore, 'proveedores');
      await addDoc(supplierRef, { nombre, direccion, telefono, idComuna });
    } catch (error) {
      console.error('Error adding supplier: ', error);
    }
  }

  async getSuppliers() {
    try {
      const supplierRef = collection(this.firestore, 'proveedores');
      const supplierSnapshot = await getDocs(supplierRef);
      return supplierSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting suppliers: ', error);
      return [];
    }
  }
}

