import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerFrom = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public error: any

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  async onRegister() {
    try {
      await this._authService.register(this.registerFrom.value.email, this.registerFrom.value.password);
      this._router.navigate(['/home']);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          this.error = "O endereço de email já está sendo usado por outra conta";
          break;
        default:
          this.error = error.message;
          break;
      }
    }
  }
}
