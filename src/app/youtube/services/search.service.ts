import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { IVideoItem } from '../models/video-item.model'
import { YoutubeHttpService } from './youtube-http.service'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private videoItems: IVideoItem[] = []

  videoDetails$ = new Subject<IVideoItem | undefined>()

  videos$ = new Observable<IVideoItem[]>()

  private videos$$ = new Subject<IVideoItem[]>()

  private videosQuery$$ = new Subject<string>()

  constructor(private httpService: YoutubeHttpService) {
    this.videos$ = this.videos$$.asObservable()
    this.videosQuery$$
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap(query => {
          return this.httpService.getVideos(query)
        }),
        switchMap(res => {
          this.videoItems = res.items
          const ids = this.videoItems.map(v => v.id.videoId).join(',')
          return this.httpService.getStatistics(ids)
        })
      )
      .subscribe(statsResp => {
        const stats = statsResp.items
        stats.forEach((stat, i) => {
          this.videoItems[i].statistics = stat.statistics
        })
        this.videos$$.next(this.videoItems)
      })
  }

  getVideos(query: string) {
    this.videosQuery$$.next(query)
  }

  getById(id: string) {
    this.httpService.getById(id).subscribe(response => {
      const video = response.items.find(v => v.id.videoId === id)
      this.videoDetails$.next(video)
    })
  }
}
