import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFrom = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public error: any

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    try {
      let result = await this._authService.login(this.loginFrom.value.email, this.loginFrom.value.password);
      if(result && result.user.emailVerified) {
        this._router.navigate(['/home'])
      } else if (result.user) {
        this._router.navigate(['/send-email']);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          this.error = "A senha é inválida ou o usuário não tem uma senha"
          break;
        default:
          this.error = error.message;
          break;
      }
    }
  }

  async onLoginGoogle() {
    try {
      let result = await this._authService.loginGoogle()
      if(result && result.user.emailVerified) {
        this._router.navigate(['/home'])
      } else if (result.user) {
        this._router.navigate(['/send-email']);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          this.error = "A senha é inválida ou o usuário não tem uma senha"
          break;
        default:
          this.error = error.message;
          break;
      }
    }
  }

}
