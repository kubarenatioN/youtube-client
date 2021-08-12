import { Component, Input } from '@angular/core'
import { IVideoItem } from 'src/app/models/video-item.model'

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() video!: IVideoItem
}
