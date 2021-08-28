import { Component, Input } from '@angular/core'
import { IVideoCard } from 'src/app/admin/models/video-card.model'

@Component({
  selector: 'app-custom-item',
  templateUrl: './custom-item.component.html',
  styleUrls: ['./custom-item.component.scss']
})
export class CustomItemComponent {
  @Input() video!: IVideoCard
}
