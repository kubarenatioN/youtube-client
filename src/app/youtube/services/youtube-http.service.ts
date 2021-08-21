import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { HttpConfigService } from 'src/app/shared/services/http-config.service'
import {
  IVideosResponse,
  IVideosStatsResponse
} from '../models/videos-response.model'

@Injectable({
  providedIn: 'root'
})
export class YoutubeHttpService {
  private url = './assets/response.json'

  constructor(
    private http: HttpClient,
    private configService: HttpConfigService
  ) {}

  getVideos(query: string): Observable<IVideosResponse> {
    return this.configService.getConfig().pipe(
      switchMap(() => {
        // return this.http.get<IVideosResponse>('./assets/response.json')
        return this.http.get<IVideosResponse>(`search`, {
          params: {
            maxResults: 3,
            type: 'video',
            part: 'snippet',
            q: query
          }
        })
      })
    )
  }

  getStatistics(ids: string): Observable<IVideosStatsResponse> {
    return this.configService.getConfig().pipe(
      switchMap(() => {
        // return this.http.get<IVideosStatsResponse>(
        //   './assets/stats-response.json'
        // )
        return this.http.get<IVideosStatsResponse>(`videos`, {
          params: {
            part: 'statistics,snippet',
            id: ids
          }
        })
      })
    )
  }

  getById(id: string): Observable<IVideosStatsResponse> {
    return this.configService.getConfig().pipe(
      switchMap(() => {
        return this.http.get<IVideosStatsResponse>(`videos`, {
          params: {
            part: 'statistics,snippet',
            id
          }
        })
      })
    )
  }
}
