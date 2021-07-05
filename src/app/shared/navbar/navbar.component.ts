import { Component, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit/*, DoCheck*/ {

  public user: Observable<any> = this._authService.user;
  public flag: boolean = true;
  public count: number = 0;

  constructor(private _authService: AuthService, private _router: Router) {
    
  }

  ngOnInit(): void {
    this.user.subscribe((a) => { console.log('user.subscribe => ',a) });
  }

  async onLogout() {
    try {
      await this._authService.logout();
      this._router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  async updateName() {
    try {
      let name = prompt("Please enter your name:");
      if (name) {
        await this._authService.updateNameUser(name);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
