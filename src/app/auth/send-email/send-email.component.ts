import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public user: Observable<any> = this._authService.user;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  async sendEmailVerification() {
    try {
      await this._authService.sendEmailVerification();
    } catch (error) {
      console.log(error);
    }
  }

}
