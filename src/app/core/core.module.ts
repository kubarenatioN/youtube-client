import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './components/header/header.component'
import { ErrorPageComponent } from './pages/error-page/error-page.component'

@NgModule({
  declarations: [HeaderComponent, ErrorPageComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [HeaderComponent]
})
export class CoreModule {}
