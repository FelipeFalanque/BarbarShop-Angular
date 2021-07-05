import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {

  }

  canActivate(): Observable<boolean> {
    return this._authService.user.pipe(
      map(user => {
        if (!user) {
          this._router.navigate(['/login'])
          return false;
        }
        return true;
      })
    );
  }
  
}
