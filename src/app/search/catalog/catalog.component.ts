import { Component } from '@angular/core';
import { ISortOptions } from 'src/app/models/sort-options.model';
import { IVideoItem } from 'src/app/models/video-item.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  sortOptions!: ISortOptions

  initialVideos: IVideoItem[] = []

  videos: IVideoItem[] = []

  sortItems(options: ISortOptions) {
    // console.log('sort items catalog', options)
    this.sortOptions = options
    this.videos = [...this.initialVideos]
  }

  setData(items: IVideoItem[]) {
    this.initialVideos = items
    this.videos = items
  }
}
