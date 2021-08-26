import { Component, Input } from '@angular/core'
import { IVideoItem } from '../../models/video-item.model'

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent {
  @Input() video?: IVideoItem
}
