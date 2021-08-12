import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IVideosResponse } from 'src/app/models/videos-response.model'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url = './assets/response.json'

  constructor(private http: HttpClient) {}

  getVideos(): Observable<IVideosResponse> {
    return this.http.get<IVideosResponse>(this.url)
  }
}
