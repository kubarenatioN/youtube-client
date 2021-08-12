import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { CanLeaveComponent } from 'src/app/core/guards/login-leave.guard'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements CanLeaveComponent {
  constructor(private loginService: LoginService) {}

  canLeave(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.loginService.isUserLogged) {
      alert('Please, login before leaving this page...')
      return false
    }
    return true
  }
}
