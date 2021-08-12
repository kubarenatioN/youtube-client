import { Component, Input } from '@angular/core'
import { ISortOptions } from 'src/app/models/sort-options.model'
import { IVideoItem } from 'src/app/models/video-item.model'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  sortOptions!: ISortOptions

  @Input() initialVideos: IVideoItem[] = []

  @Input() videos: IVideoItem[] = []

  sortItems(options: ISortOptions) {
    this.sortOptions = options
    this.videos = [...this.initialVideos]
  }

  setData(items: IVideoItem[]) {
    this.initialVideos = items
    this.videos = items
  }
}
