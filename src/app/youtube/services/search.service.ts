import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map, pluck } from 'rxjs/operators'
import { IVideoItem } from '../models/video-item.model'
import { SearchHttpService } from './search-http.service'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  videos: IVideoItem[] = []

  videos$ = new Subject<IVideoItem[]>()

  videoDetails$ = new Subject<IVideoItem | undefined>()

  constructor(private searchHttp: SearchHttpService) {
    this.getVideos()
  }

  getVideos(): void {
    this.searchHttp
      .getVideos()
      .pipe(map(response => response.items))
      .subscribe(videos => {
        this.videos = videos
        this.videos$.next(this.videos)
      })
  }

  getById(id: string): void {
    this.searchHttp
      .getVideos()
      .pipe(
        pluck('items'),
        map(items => items.find(it => it.id === id))
      )
      .subscribe(video => {
        this.videoDetails$.next(video)
      })
  }
}
