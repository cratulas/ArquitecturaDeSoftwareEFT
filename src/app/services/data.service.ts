import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, updateDoc, deleteDoc, CollectionReference, getDoc } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private comunaCollection: CollectionReference;
  private regionCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.comunaCollection = collection(this.firestore, 'comunas');
    this.regionCollection = collection(this.firestore, 'regiones');
  }

  // Métodos para Comuna
  async addComuna(comuna: any) {
    try {
      await addDoc(this.comunaCollection, comuna);
    } catch (error) {
      throw error;
    }
  }

  async getComunas() {
    const snapshot = await getDocs(this.comunaCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateComuna(id: string, comuna: any) {
    try {
      const comunaDoc = doc(this.comunaCollection, id);
      await updateDoc(comunaDoc, comuna);
    } catch (error) {
      throw error;
    }
  }

  async deleteComuna(id: string) {
    try {
      const comunaDoc = doc(this.comunaCollection, id);
      await deleteDoc(comunaDoc);
    } catch (error) {
      throw error;
    }
  }

  async getComunaById(id: string) {
    const comunaDoc = doc(this.comunaCollection, id);
    const comunaSnapshot = await getDoc(comunaDoc);
    return comunaSnapshot.exists() ? comunaSnapshot.data() : null;
  }

  // Métodos para Region
  async addRegion(region: any) {
    try {
      await addDoc(this.regionCollection, region);
    } catch (error) {
      throw error;
    }
  }

  async getRegiones() {
    const snapshot = await getDocs(this.regionCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateRegion(id: string, region: any) {
    try {
      const regionDoc = doc(this.regionCollection, id);
      await updateDoc(regionDoc, region);
    } catch (error) {
      throw error;
    }
  }

  async deleteRegion(id: string) {
    try {
      const regionDoc = doc(this.regionCollection, id);
      await deleteDoc(regionDoc);
    } catch (error) {
      throw error;
    }
  }

  async getRegionById(id: string) {
    const regionDoc = doc(this.regionCollection, id);
    const regionSnapshot = await getDoc(regionDoc);
    return regionSnapshot.exists() ? regionSnapshot.data() : null;
  }
}
