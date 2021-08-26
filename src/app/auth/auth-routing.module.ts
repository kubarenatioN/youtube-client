import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginLeaveGuard } from '../core/guards/login-leave.guard'
import { LoginComponent } from './pages/login/login.component'

const routes: Routes = [
  { path: '', component: LoginComponent, canDeactivate: [LoginLeaveGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
