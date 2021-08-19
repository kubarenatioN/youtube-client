import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IVideosResponse } from '../models/videos-response.model'

@Injectable({
  providedIn: 'root',
})
export class SearchHttpService {
  private url = './assets/response.json'

  constructor(private http: HttpClient) {}

  getVideos(): Observable<IVideosResponse> {
    return this.http.get<IVideosResponse>(this.url)
  }
}
