import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  switchMap
} from 'rxjs/operators'
import { IVideoStatsItem } from '../models/video-item.model'
import { YoutubeHttpService } from './youtube-http.service'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private videosQuery$$ = new Subject<string>()

  private videos$$ = new BehaviorSubject<IVideoStatsItem[]>([])

  private videoDetails$$ = new Subject<IVideoStatsItem | null>()

  videos$ = this.videos$$.asObservable()

  videoDetails$ = this.videoDetails$$.asObservable()

  get currentVideos(): IVideoStatsItem[] {
    return this.videos$$.value
  }

  constructor(private httpService: YoutubeHttpService) {
    this.videosQuery$$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(query => this.httpService.getVideos(query)),
        pluck('items'),
        map(items => items.map(v => v.id.videoId).join(',')),
        switchMap(ids => this.httpService.getStatistics(ids)),
        pluck('items')
      )
      .subscribe(videos => {
        this.videos$$.next(videos)
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
