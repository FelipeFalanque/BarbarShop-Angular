import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({providedIn: 'root'})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private _angularFireAuth: AngularFireAuth) {
    this.user = _angularFireAuth.authState;
  }

  async loginPhoneStepOne(num: string, appVerifier: auth.ApplicationVerifier) {
    return await this._angularFireAuth.signInWithPhoneNumber(num, appVerifier)
  }

  async loginPhoneStepTwo(credential: auth.AuthCredential) {
    return await this._angularFireAuth.signInWithCredential(credential);
  }

  async loginGoogle() {
    return await this._angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  async login(email: string, password: string) {
    return await this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this._angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
 
  async logout() {
    return await this._angularFireAuth.signOut()
  }

  async updateNameUser(name: string) {
    return (await this._angularFireAuth.currentUser).updateProfile({ displayName: name});
  }

  async sendEmailVerification() {
    return (await this._angularFireAuth.currentUser).sendEmailVerification();
  }

  async sendEmailResetPassword(email: string) {
    return await this._angularFireAuth.sendPasswordResetEmail(email);
  }
}
