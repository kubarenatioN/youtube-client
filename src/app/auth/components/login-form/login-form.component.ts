import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { IUser } from '../../models/user.model'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.loginService.user$.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['search'])
      }
    })
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const user: IUser = {
        ...form.value,
        token: Date.now(),
      }
      this.loginService.setUser(user)
      form.resetForm()
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
