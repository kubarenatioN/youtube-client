import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { IVideoStatsItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'
import { SortbarManagerService } from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  videos: IVideoStatsItem[] = []

  videosSubscription!: Subscription

  sortOptionsSubscription!: Subscription

  constructor(
    private searchService: SearchService,
    private sortService: SortbarManagerService
  ) {}

  ngOnInit(): void {
    this.videos = this.searchService.videoItems
    this.videosSubscription = this.searchService.videos$.subscribe(data => {
      this.videos = data
    })
    this.sortOptionsSubscription = this.sortService.options$.subscribe(() => {
      this.videos = [...this.videos]
    })
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe()
    this.sortOptionsSubscription.unsubscribe()
  }
}
