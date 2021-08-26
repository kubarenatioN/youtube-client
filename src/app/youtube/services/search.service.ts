import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map, pluck } from 'rxjs/operators'
import { IVideoItem } from '../models/video-item.model'
import { SearchHttpService } from './search-http.service'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private videos$$ = new Subject<IVideoItem[]>()

  private videoDetails$$ = new Subject<IVideoItem | undefined>()

  videos$ = this.videos$$.asObservable()

  videoDetails$ = this.videoDetails$$.asObservable()

  constructor(private searchHttp: SearchHttpService) {
    this.getVideos()
  }

  getVideos(): void {
    this.searchHttp
      .getVideos()
      .pipe(map(response => response.items))
      .subscribe(videos => {
        this.videos$$.next(videos)
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
        this.videoDetails$$.next(video)
      })
  }
}
