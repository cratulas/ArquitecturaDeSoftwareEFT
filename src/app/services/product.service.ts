import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  async addProduct(nombre: string, precio: number, idProveedor: string, fotoUrl: string) {
    try {
      const productRef = collection(this.firestore, 'productos');
      await addDoc(productRef, { nombre, precio, idProveedor, fotoUrl });
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  }

  async getProducts() {
    try {
      const productRef = collection(this.firestore, 'productos');
      const productSnapshot = await getDocs(productRef);
      return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting products: ', error);
      return [];
    }
  }

  async updateProduct(id: string, nombre: string, precio: number, idProveedor: string, fotoUrl: string) {
    try {
      const productRef = doc(this.firestore, 'productos', id);
      await updateDoc(productRef, { nombre, precio, idProveedor, fotoUrl });
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  }

  async deleteProduct(id: string) {
    try {
      const productRef = doc(this.firestore, 'productos', id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  }
}
