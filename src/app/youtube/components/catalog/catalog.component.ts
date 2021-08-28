import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { IVideoCard } from 'src/app/admin/models/video-card.model'
import {
  apiVideos,
  customVideos
} from 'src/app/redux/selectors/videos.selectors'
import { AppState } from 'src/app/redux/state/app.state'
import { IVideoStatsItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'
import { SortbarManagerService } from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  youtubeVideos: IVideoStatsItem[] = []

  customVideos: IVideoCard[] = []

  youtubeVideos$ = this.store.select(apiVideos)

  customVideos$ = this.store.select(customVideos)

  videosSubscription!: Subscription

  customVideosSubscription!: Subscription

  sortOptionsSubscription!: Subscription

  constructor(
    private searchService: SearchService,
    private sortService: SortbarManagerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.videosSubscription = this.youtubeVideos$.subscribe(videos => {
      this.youtubeVideos = videos
    })
    this.customVideosSubscription = this.customVideos$.subscribe(videos => {
      this.customVideos = videos
    })
    this.sortOptionsSubscription = this.sortService.options$.subscribe(() => {
      this.youtubeVideos = [...this.youtubeVideos]
    })
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe()
    this.customVideosSubscription.unsubscribe()
    this.sortOptionsSubscription.unsubscribe()
  }

  loadMoreVideos(): void {
    this.searchService.loadMoreVideos()
  }
}
