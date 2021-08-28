import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module'
import { CreateCardComponent } from './components/create-card/create-card.component'
import { AdminComponent } from './pages/admin.component'

@NgModule({
  declarations: [AdminComponent, CreateCardComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule]
})
export class AdminModule {}
