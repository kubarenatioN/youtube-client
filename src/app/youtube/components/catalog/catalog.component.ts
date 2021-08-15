import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { IVideoItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'
import { SortbarManagerService } from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  initialVideos: IVideoItem[] = []

  videos: IVideoItem[] = []

  videosSubscription!: Subscription

  sortOptionsSubscription!: Subscription

  constructor(
    private searchService: SearchService,
    private sortService: SortbarManagerService
  ) {}

  ngOnInit(): void {
    this.videosSubscription = this.searchService.videos$.subscribe(data => {
      this.videos = data
      this.initialVideos = data
    })
    this.sortOptionsSubscription = this.sortService.options$.subscribe(() => {
      this.videos = [...this.videos]
    })
    this.searchService.getVideos()
  }

  ngOnDestroy() {
    this.videosSubscription.unsubscribe()
    this.sortOptionsSubscription.unsubscribe()
  }
}
