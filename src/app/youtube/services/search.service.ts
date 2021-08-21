import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  switchMap,
  tap
} from 'rxjs/operators'
import { IVideoStatsItem } from '../models/video-item.model'
import { YoutubeHttpService } from './youtube-http.service'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private videosQuery$$ = new Subject<string>()

  videoItems: IVideoStatsItem[] = []

  private videos$$ = new Subject<IVideoStatsItem[]>()

  private videoDetails$$ = new Subject<IVideoStatsItem | null>()

  videos$ = this.videos$$.asObservable()

  videoDetails$ = this.videoDetails$$.asObservable()

  constructor(private httpService: YoutubeHttpService) {
    this.videosQuery$$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(query => {
          return this.httpService.getVideos(query)
        }),
        pluck('items'),
        map(items => items.map(v => v.id.videoId).join(',')),
        switchMap(ids => {
          return this.httpService.getStatistics(ids)
        }),
        pluck('items'),
        tap(videos => {
          this.videoItems = videos
        })
      )
      .subscribe(() => {
        this.videos$$.next(this.videoItems)
      })
  }

  getVideos(query: string): void {
    this.videosQuery$$.next(query)
  }

  getById(id: string): void {
    this.httpService
      .getById(id)
      .pipe(map(res => res.items[0]))
      .subscribe(video => {
        this.videoDetails$$.next(video)
      })
  }
}
