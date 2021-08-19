import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { IUser } from '../../models/user.model'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    if (f.valid) {
      const user: IUser = {
        ...f.value,
        token: Date.now(),
      }
      this.loginService.setUser(user)
      f.resetForm()
    }
  }
}
