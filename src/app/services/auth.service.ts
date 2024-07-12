import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string, rutUsuario: string, nombreUsuario: string, direccionUsuario: string, telefonoUsuario: string, idComuna: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'users', userId), {
        idUsuario: userId,
        rutUsuario,
        nombreUsuario,
        direccionUsuario,
        telefonoUsuario,
        idComuna,
        isAdmin: false 
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  async getUserData(userId: string) {
    try {
      const userDoc = doc(this.firestore, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      throw error;
    }
  }

  async updateUserData(userId: string, userData: any) {
    try {
      const userDoc = doc(this.firestore, 'users', userId);
      await updateDoc(userDoc, userData);
    } catch (error) {
      throw error;
    }
  }
}
