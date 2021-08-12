import { Component, Input } from '@angular/core'
import { IVideoItem } from '../../models/video-item.model'

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent {
  @Input() video!: IVideoItem
}
