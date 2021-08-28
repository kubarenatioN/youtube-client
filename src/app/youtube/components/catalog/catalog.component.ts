import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { IVideoCard } from 'src/app/admin/models/video-card.model'
import { allVideos } from 'src/app/redux/selectors/videos.selectors'
import { AppState, EVideoType } from 'src/app/redux/state/app.state'
import { IVideoStatsItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'
import { SortbarManagerService } from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  videos: (IVideoStatsItem | IVideoCard)[] = []

  videoType = EVideoType

  videos$ = this.store.select(allVideos)

  videosSubscription!: Subscription

  sortOptionsSubscription!: Subscription

  constructor(
    private searchService: SearchService,
    private sortService: SortbarManagerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.videosSubscription = this.videos$.subscribe(videos => {
      console.log('catalog:', videos)
      this.videos = videos
    })
    this.sortOptionsSubscription = this.sortService.options$.subscribe(() => {
      this.videos = [...this.videos]
    })
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe()
    this.sortOptionsSubscription.unsubscribe()
  }

  loadMoreVideos(): void {
    this.searchService.loadMoreVideos()
  }

  // isYoutubeVideo = (item: { kind: string }): item is IVideoStatsItem =>
  //   item.kind === EVideoType.Youtube

  // isCustomVideo = (item: { kind: string }): item is IVideoCard =>
  //   item.kind === EVideoType.Custom

  convert<T>(item: unknown): T {
    return item as T
  }
}
