import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { IUser } from '../../models/user.model'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private loginService: LoginService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const user: IUser = {
        ...form.value,
        token: Date.now()
      }
      this.loginService.setUser(user)
      form.resetForm()
    }
  }
}
