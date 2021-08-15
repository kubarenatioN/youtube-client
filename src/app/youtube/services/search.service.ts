import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { IVideosResponse } from '../models/videos-response.model'
import { IVideoItem } from '../models/video-item.model'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url = './assets/response.json'

  response?: IVideosResponse

  videos: IVideoItem[] = []

  videos$ = new Subject<IVideoItem[]>()

  videoDetails$ = new Subject<IVideoItem | undefined>()

  constructor(private http: HttpClient) {
    this.getVideos()
  }

  getVideos() {
    this.http.get<IVideosResponse>(this.url).subscribe(response => {
      this.response = response
      this.videos = response.items
      this.videos$.next(this.videos)
    })
  }

  getById(id: string) {
    this.http.get<IVideosResponse>(this.url).subscribe(response => {
      this.response = response
      const video = response.items.find(v => v.id === id)
      this.videoDetails$.next(video)
    })
  }
}
