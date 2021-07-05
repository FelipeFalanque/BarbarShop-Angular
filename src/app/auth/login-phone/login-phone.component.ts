import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '../model/phone-number';
import { WindowService } from '../services/window.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.css']
})
export class LoginPhoneComponent implements OnInit {

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  recaptchaVerifier;
  error: string;

  public user: Observable<any> = this._auth.user;

  constructor(
    private win: WindowService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {

    !firebase.apps.length ? firebase.initializeApp(environment.firebaseConfig) : firebase.app();

    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {

    this.error = "";

    if (this.phoneNumber.area == undefined || this.phoneNumber.area.length != 2) {
      this.error += "*DDD deve conter dois digitos"
      return;
    }

    if (this.phoneNumber.phone == undefined || this.phoneNumber.phone.length != 9) {
      this.error += "*Numero do Celular deve conter nove digitos"
      return;
    }

    if (!this.error)
      this.onLoginPhoneStepOne();
  }

  verifyLoginCode() {
    this.onLoginPhoneSetpTwo();
  }

  async onLoginPhoneStepOne() {
    try {

      let result = await this._auth.loginPhoneStepOne(
        this.phoneNumber.phoneFormat,
        this.windowRef.recaptchaVerifier);
      
      console.log(result);
      
      this.windowRef.confirmationResult = result;

    } catch (error) {
      switch (error.code) {
        default:
          this.error = error.message;
          break;
      }
    }
  }

  async onLoginPhoneSetpTwo() {
    
    let credential =
    firebase.auth.PhoneAuthProvider.credential(
      this.windowRef.confirmationResult.verificationId,
      this.verificationCode);

    try {

      let result =
        await this._auth.loginPhoneStepTwo(credential);

      if(result)
        this._router.navigate(['/home'])

    } catch (error) {
      switch (error.code) {
        default:
          this.error = error.message;
          break;
      }
    }
  }
}
