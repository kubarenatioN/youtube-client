import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  switchMap
} from 'rxjs/operators'
import { HttpConfigService } from 'src/app/shared/services/http-config.service'
import { IVideoStatsResponse } from '../models/video-stats.model'
import { IVideosResponse } from '../models/videos-response.model'

@Injectable({
  providedIn: 'root',
})
export class YoutubeHttpService {
  private url = './assets/response.json'

  constructor(
    private http: HttpClient,
    private configService: HttpConfigService
  ) {}

  getVideos(query: string) {
    return this.configService.getConfig().pipe(
      switchMap(config => {
        return this.http.get<IVideosResponse>('./assets/response.json')

        // return this.http.get<IVideosResponse>(
        //   `${config.youtubeApiBase}search?type=video&part=snippet&maxResults=12&key=${config.apiKey}&q=${query}`
        // )
      })
    )
  }

  getStatistics(ids: string) {
    return this.configService.getConfig().pipe(
      switchMap(config => {
        return this.http.get<IVideoStatsResponse>(
          './assets/stats-response.json'
        )
        // return this.http.get<IVideoStatsResponse>(
        //   `${config.youtubeApiBase}videos?part=statistics,snippet&key=${config.apiKey}&id=${ids}`
        // )
      })
    )
  }

  getById(id: string) {
    return this.http.get<IVideosResponse>(this.url)
  }
}
