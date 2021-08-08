import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSortActive = false

  title = 'YouTube Client'

  changeSortVisibility(visibility: boolean) {
    this.isSortActive = visibility
  }
}
