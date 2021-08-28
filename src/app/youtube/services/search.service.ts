import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  switchMap,
  tap
} from 'rxjs/operators'
import { addVideos, getVideos } from 'src/app/redux/actions/videos.actions'
import { AppState } from 'src/app/redux/state/app.state'
import { IVideoStatsItem } from '../models/video-item.model'
import { YoutubeHttpService } from './youtube-http.service'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private query = ''

  private nextPageToken?: string

  private videosQuery$$ = new Subject<string>()

  private videoDetails$$ = new Subject<IVideoStatsItem | null>()

  videoDetails$ = this.videoDetails$$.asObservable()

  constructor(
    private httpService: YoutubeHttpService,
    private store: Store<AppState>
  ) {
    this.videosQuery$$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(query => this.httpService.getVideos(query)),
        tap(res => {
          this.nextPageToken = res.nextPageToken
        }),
        pluck('items'),
        map(items => items.map(v => v.id.videoId).join(',')),
        switchMap(ids => this.httpService.getStatistics(ids)),
        pluck('items')
      )
      .subscribe(videos => {
        this.store.dispatch(
          getVideos({
            videos
          })
        )
      })
  }

  getVideos(query: string): void {
    this.query = query
    this.videosQuery$$.next(this.query)
  }

  getById(id: string): void {
    this.httpService
      .getById(id)
      .pipe(map(res => res.items[0]))
      .subscribe(video => {
        this.videoDetails$$.next(video)
      })
  }

  loadMoreVideos(): void {
    this.httpService
      .getVideos(this.query, this.nextPageToken)
      .pipe(
        tap(res => {
          this.nextPageToken = res.nextPageToken
        }),
        pluck('items'),
        map(items => items.map(v => v.id.videoId).join(',')),
        switchMap(ids => this.httpService.getStatistics(ids)),
        pluck('items')
      )
      .subscribe(videos => {
        this.store.dispatch(
          addVideos({
            videos
          })
        )
      })
  }
}
