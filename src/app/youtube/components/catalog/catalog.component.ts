import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ISortOptions } from 'src/app/youtube/models/sort-options.model'
import { IVideoItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  sortOptions!: ISortOptions

  initialVideos: IVideoItem[] = []

  videos: IVideoItem[] = []

  videosSubscription!: Subscription

  sortOptionsSubscription!: Subscription

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.videosSubscription = this.searchService.videos$.subscribe(data => {
      // console.log('catalog:', data)
      this.videos = data
      this.initialVideos = data
    })
    this.sortOptionsSubscription = this.searchService.sortOptions$.subscribe(
      options => {
        this.sortItems(options)
      }
    )
    this.searchService.getVideos()
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe()
    this.sortOptionsSubscription.unsubscribe()
  }

  private sortItems(options: ISortOptions) {
    // console.log('sort items catalog', options)
    this.sortOptions = options
    this.videos = [...this.initialVideos]
  }
}
