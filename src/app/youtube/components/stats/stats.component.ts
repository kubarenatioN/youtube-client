import { Component, Input } from '@angular/core'
import { IVideoStats } from '../../models/video-item.model'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input() stats!: IVideoStats
}
