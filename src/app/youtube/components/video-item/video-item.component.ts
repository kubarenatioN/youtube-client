import { Component, Input } from '@angular/core'
import { IVideoStatsItem } from '../../models/video-item.model'

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() video!: IVideoStatsItem
}
