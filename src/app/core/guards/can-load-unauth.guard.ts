import { Injectable } from '@angular/core'
import { CanLoad, Router } from '@angular/router'
import { LoginService } from 'src/app/auth/services/login.service'

@Injectable({
  providedIn: 'root',
})
export class CanLoadUnauthGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canLoad(): boolean {
    if (!this.loginService.isUserLogged) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}
