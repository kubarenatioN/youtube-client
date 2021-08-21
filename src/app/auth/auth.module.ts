import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LoginComponent } from './pages/login/login.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
