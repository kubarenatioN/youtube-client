import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSortActive = false

  @Output() changeSortVisibility = new EventEmitter<boolean>()

  @Output() search = new EventEmitter()

  toggleSort() {
    this.isSortActive = !this.isSortActive
    this.changeSortVisibility.emit(this.isSortActive)
  }
}
