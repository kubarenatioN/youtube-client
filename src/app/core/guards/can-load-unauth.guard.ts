import { Injectable } from '@angular/core'
import { CanLoad, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { LoginService } from 'src/app/auth/services/login.service'

@Injectable({
  providedIn: 'root',
})
export class CanLoadUnauthGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.loginService.isUserLogged) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}
