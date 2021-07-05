import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm = new FormGroup({
    email: new FormControl('')
  });

  public error: any

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  async onSendEmailResetPassword() {
    try {
      await this._authService.sendEmailResetPassword(this.resetPasswordForm.value.email);
      alert("E-mail enviado, Verifique sua caixa de e-mail para fazer o reset da senha");
      this._router.navigate(['/login']);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          this.error = "Não há registro de usuário correspondente a esse endereço e-mail. O usuário pode ter sido excluído"
          break;
        default:
          this.error = error.message;
          break;
      }
    }
  }

}
