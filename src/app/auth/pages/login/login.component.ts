import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { CanLeaveComponent } from 'src/app/core/guards/login-leave.guard'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements CanLeaveComponent, OnInit, OnDestroy {
  userSubscription!: Subscription

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.userSubscription = this.loginService.user$.subscribe()
  }

  canLeave(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.loginService.isUserLogged) {
      alert('Please, login before leaving this page...')
      return false
    }
    return true
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
